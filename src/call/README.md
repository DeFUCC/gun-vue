# Call Module — Usage & Testing

Language: English (default) · 中文版本 → ./README_ZH.md

This folder contains the Call Panel and related logic. Use the following URL to open and test the call UI:

- Test URL: http://localhost:3342/#/call

Note: If port 3342 is occupied, the dev server may pick the next available port. Follow your terminal output.

## Start the frontend

If you haven’t started the frontend dev server:

1. Open a terminal and go to the app folder: `cd gun-vue/app`
2. Start a dev server (pick one):
   - `pnpm -w exec vite --host`
   - or `npm run dev`
3. Open http://localhost:3342/#/call in your browser

## Recommended relay (signaling + media/ICE)

For signaling and ICE (STUN/TURN), use the self-hostable relay in this repo:

- English (Relay): ../../gun-vue-call-relay/README.md
- 中文（Relay）: ../../gun-vue-call-relay/README_ZH.md

That relay bundles Socket.IO signaling and embedded STUN/TURN in one address and exposes a dynamic /ice endpoint. It is the preferred way to test end‑to‑end calls (signaling + media) locally.

Quick idea (see relay README for full steps):
- Node.js 18+
- Configure .env if needed and start the relay
- Verify http://localhost:8765/ and curl http://localhost:8765/ice

## UI overview

Top (fixed height):
- Local Video (left)
- Remote Videos (right, multi‑peer grid)

Bottom (scrollable):
- Device Selection (mic/cam + enable toggles)
- Start / Stop controls
- Room Key (Generate Key Pair, Enable End‑to‑End Encryption)
- Manual Signaling (enter relay origin, Load ICE, Save)
- Language switch
- Connection Status (connected, peers)
- Logs (events/ICE/errors)

## Basic flow

1) Open http://localhost:3342/#/call

2) Device Selection: choose microphone and camera (you can disable either).

3) Room Key (optional but recommended):
- Generate Key Pair to create a room key pair, or paste an existing one
- Enable End‑to‑End Encryption if both sides share the full key pair

4) Manual Signaling (recommended when using the relay):
- Enter your relay origin (e.g., http://localhost:8765)
- Click Load ICE to fetch ICE via /ice from the relay; then click Save

5) Click Start and allow the browser to access your mic/camera as needed.

6) On another device/browser, open the same page and use the same room key to join. If E2EE is enabled, both sides must share the full key pair.

7) If the connection succeeds, remote videos will appear in the Remote Videos panel.

8) Click Stop to leave the call and release devices.

## Troubleshooting

- Local video is black:
  - Grant camera permission
  - Ensure the correct camera is selected in Device Selection
  - Or disable the camera to do audio‑only

- No remote video:
  - Confirm both sides joined the same room (same key pair)
  - Ensure the signaling origin is reachable
  - Load ICE from the relay; consider STUN/TURN for NAT/firewalled networks
  - Check the Logs panel for hints/errors

- End‑to‑End Encryption (E2EE):
  - Requires a full key pair (pub + priv); sharing only the public key is not enough

- Browser support:
  - Prefer up‑to‑date Chrome/Edge/Safari; WebRTC behaviors vary across browsers

## Notes for developers

- Manual signaling & ICE:
  - Load ICE fetches from your relay /ice endpoint and shows a summary in UI

- Local persistence:
  - The signaling origin is saved in localStorage for convenience

- Remote video rendering:
  - Each remote stream is bound to its peerId and shown in the Remote Videos grid