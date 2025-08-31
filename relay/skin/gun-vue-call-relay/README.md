# Gun-Vue-Call Relay (Gun + Embedded STUN/TURN)

[中文说明请点击这里 → README_ZH.md](./README_ZH.md)

A lightweight, self-hostable relay that bundles:
- A Gun peer (HTTP) for data sync and /gun endpoint
- Socket.IO-based signaling for WebRTC peers
- An embedded STUN/TURN server (UDP) running in the same process and same numeric port by default
- A dynamic /ice endpoint to expose ICE servers and signaling origins to the frontend

This design lets you deploy a single domain/address that serves both signaling and ICE, making it easy to self-host without relying on Google/Cloudflare STUN.

---

## Quick Start

Prerequisites:
- Node.js 18+ (LTS recommended)
- pnpm (recommended) or npm

Install dependencies:
- pnpm i

Configure environment (optional but recommended):
- Create relay/.env with at least:
```
RELAY_PORT=8765
RELAY_PATH=public
RELAY_QR=true
RELAY_HOST=
FORCE_HTTPS=false
RELAY_HTTPS=false

# Prefer the embedded STUN/TURN first
PREFER_LOCAL_TURN=true
TURN_ENABLE=true
STUN_TURN_ENABLE=true
# Public IP or hostname used to build ICE URLs (leave empty to auto-detect LAN IP)
TURN_PUBLIC_IP=
# Embedded STUN/TURN UDP port (default shares 8765)
TURN_PORT=8765
# TURN relay (media) port range
TURN_MIN_PORT=49160
TURN_MAX_PORT=49200
# Optional TURN long-term credentials (if you want TURN, otherwise only STUN is exposed)
TURN_REALM=local
TURN_USERNAME=
TURN_CREDENTIAL=
```

Start the relay:
- pnpm start
- Or: node -r dotenv/config start.js

Verify:
- Open http://localhost:8765/ in your browser
- Check ICE config: curl http://localhost:8765/ice (should include stun:<host>:8765 when embedded STUN is enabled)

Notes:
- If TCP 8765 is already in use, the HTTP server will automatically try the next port (8766, 8767, ...). The embedded STUN/TURN by default binds UDP 8765; you can change TURN_PORT if needed.
- Gun UDP multicast is disabled by default to avoid conflicts with the embedded TURN/UDP socket.

---

## Project Structure

```
relay/
  ├── server.js        # Express app, /ice endpoint, Gun init, Socket.IO, embedded STUN/TURN
  ├── start.js         # Bootstrap to start the relay
  ├── public/
  │   └── index.html   # Static landing page (for local test)
  ├── .env             # Environment configuration (optional)
  ├── package.json     # Scripts and dependencies
  ├── Dockerfile       # (Optional) containerization entry
  └── README.md        # This file
```

Key runtime dependencies:
- express: HTTP server and static hosting
- gun: database peer, exposes /gun
- socket.io: signaling channel for WebRTC peers
- node-turn: embedded STUN/TURN (UDP)
- dotenv: environment configuration loader

---

## Features

- Single-address deployment
  - HTTP on TCP :8765 for /, /gun, Socket.IO
  - STUN/TURN on UDP :8765 by default (same numeric port, different protocol)
- Dynamic ICE discovery
  - GET /ice returns the ICE servers and signaling origins detected at runtime
  - Priority order: embedded STUN/TURN (if enabled) > ICE_SERVERS JSON > STUN_URLS/TURN_URLS (env) > fallback to public STUN
- Signaling with access control hooks
  - Socket.IO + SEA verification pattern for room joining/auth
- LAN-first behavior, Internet-ready
  - LAN peers will often connect directly (host/prflx candidates), TURN relays only when required
- Configurable via .env with sensible defaults
- QR code output for quick pairing in LAN demos

---

## Implementation Notes

- Embedded STUN/TURN
  - Powered by node-turn and bound to UDP TURN_PORT (default 8765)
  - If TURN_USERNAME and TURN_CREDENTIAL are provided, /ice includes turn: URLs with long-term credentials
  - If not provided, /ice only exposes STUN to avoid advertising an open relay
- HTTP server port probing
  - If RELAY_PORT is in use for TCP, server increments to the next available port for HTTP
  - TURN UDP port is independent; change TURN_PORT in .env to avoid conflicts
- ICE construction
  - /ice builds ICE servers with this priority:
    1) Embedded entries (if enabled and PREFER_LOCAL_TURN=true)
    2) ICE_SERVERS (JSON string) from env
    3) STUN_URLS and TURN_URLS (comma-separated) + TURN_USERNAME/CREDENTIAL
    4) Fallback public STUN (for dev)
- Multicast disabled
  - Gun’s UDP multicast is disabled by default to avoid binding conflicts with TURN

---

## How To Extend

- Add TURN long-term credentials
  - Set TURN_USERNAME and TURN_CREDENTIAL in .env, restart the server
  - /ice will include turn:<host>:<port> entries
- Customize ICE priority
  - Set PREFER_LOCAL_TURN=false if you want external ICE configs to come first
  - Provide a fully custom ICE_SERVERS JSON to take full control
- External (production-grade) TURN
  - For Internet use, a dedicated coturn deployment is recommended (UDP and/or TCP/TLS). Point STUN_URLS/TURN_URLS to it and disable embedded TURN if desired.
- TURN ports for Internet
  - Ensure UDP TURN_PORT and the relay media port range (TURN_MIN_PORT–TURN_MAX_PORT) are allowed in firewall/NAT
  - For NATed hosts, set TURN_PUBLIC_IP to your public address/hostname
- Signaling extensions
  - Add authentication/authorization logic in the Socket.IO handlers to control who can join a room and when

---

## Enhance or Replace Encryption

WebRTC provides built-in DTLS-SRTP encryption by default. If you want application-layer end‑to‑end encryption (E2EE) on top of WebRTC:

- Insertable Streams E2EE (modern browsers)
  - Requires browser support for RTP Encoded Transforms and (ideally) a crossOriginIsolated context
  - To enable cross-origin isolation, consider adding security headers from the server:
    - Cross-Origin-Opener-Policy: same-origin
    - Cross-Origin-Embedder-Policy: require-corp
  - Then inject transforms on RTCRtpSender/RTCRtpReceiver to encrypt/decrypt frames with your room key material
- Key management
  - Derive room/session keys via Gun SEA, a KDF (HKDF/SHA-256), or integrate your own KMS
  - Consider per-participant key ratchets (e.g., Double Ratchet) or MLS for group messaging
- Progressive enhancement
  - Feature-detect support; enable E2EE transforms only when available
  - Provide a clear UI state: E2EE on/off and reason (unsupported vs. disabled)
- Replacing E2EE
  - You can replace transforms with your own cryptosystem, as long as both peers agree on framing and keys
  - For production, prefer audited primitives and well-defined key lifetimes/rotation

Note: If Insertable Streams are unsupported, the app should gracefully fall back to baseline WebRTC encryption (no additional application-layer E2EE).

---

## API

- GET /ice
  - Response example:
    ```json
    {
      "iceServers": [
        { "urls": ["stun:your.host:8765"] },
        { "urls": ["turn:your.host:8765?transport=udp"], "username": "u", "credential": "p" }
      ],
      "signaling": {
        "currentOrigin": "http://your.host:8765",
        "localOrigin": "http://localhost:8765"
      }
    }
    ```

---

## Troubleshooting

- EADDRINUSE on 8765
  - Another process may be listening on TCP 8765. The HTTP server will try the next port, but the embedded TURN (UDP) might still bind 8765 if you configured it so. Adjust RELAY_PORT or TURN_PORT to avoid collisions.
- Seeing local/LAN addresses in candidates
  - Normal. With STUN enabled, browsers discover both public and local candidates and will prefer the most direct path (LAN/host/prflx) when possible.
- E2EE Type errors
  - Likely due to missing Insertable Streams support or cross-origin isolation. Implement feature detection and/or add COOP/COEP headers.

---

## Production Tips

- Prefer a dedicated coturn for Internet-facing deployments
- Use TURN REST auth (time-limited HMAC credentials) to prevent abuse
- Restrict relay port ranges and secure firewall/NAT rules
- Monitor and rotate credentials regularly

---

## My Notes

- The embedded STUN/TURN is meant for simple, portable self-hosting and LAN-first scenarios. For heavy Internet use or large rooms, external coturn is the recommended path.
- The /ice endpoint lets you iterate quickly without rebuilding the frontend—change .env and restart to test different ICE setups.
- If you want a UI switch to force TURN-only (iceTransportPolicy='relay'), it’s straightforward to add and useful for debugging.