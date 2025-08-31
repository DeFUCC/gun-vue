# Gun-Vue-Call Relay（Gun + 内嵌 STUN/TURN）

这是一个轻量、可自部署的中继服务，集成：
- Gun 节点（HTTP），提供 /gun 数据同步
- 基于 Socket.IO 的 WebRTC 信令
- 内嵌 STUN/TURN（UDP），默认与 HTTP 使用相同的数字端口号
- /ice 接口动态返回 ICE 配置与信令源信息

目标是使用“单域名/单端口”的方式，既提供信令，也提供 ICE，避免依赖 Google/Cloudflare 等公共 STUN 服务。

### 快速开始

环境要求：Node.js 18+；建议使用 pnpm。

安装依赖：
- pnpm i

配置环境（建议）：创建 relay/.env，示例：
```
RELAY_PORT=8765
RELAY_PATH=public
RELAY_QR=true
RELAY_HOST=
FORCE_HTTPS=false
RELAY_HTTPS=false

PREFER_LOCAL_TURN=true
TURN_ENABLE=true
STUN_TURN_ENABLE=true
TURN_PUBLIC_IP=
TURN_PORT=8765
TURN_MIN_PORT=49160
TURN_MAX_PORT=49200
TURN_REALM=local
TURN_USERNAME=
TURN_CREDENTIAL=
```

启动：
- pnpm start
- 或：node -r dotenv/config start.js

验证：
- 访问 http://localhost:8765/
- curl http://localhost:8765/ice 查看 ICE 配置（应包含 stun:<主机>:8765）

注意：如果 8765（TCP）被占用，HTTP 会自动尝试下一个端口；内嵌 STUN/TURN 默认绑定 8765（UDP），需要时可修改 TURN_PORT。

### 目录结构
```
relay/
  ├── server.js
  ├── start.js
  ├── public/
  │   └── index.html
  ├── .env
  ├── package.json
  ├── Dockerfile
  └── README.md
```

### 功能
- 单地址部署：HTTP (/:/gun/Socket.IO) + STUN/TURN（UDP）
- /ice 动态返回 ICE 和信令源
- 优先级：内嵌 STUN/TURN > ICE_SERVERS(JSON) > STUN_URLS/TURN_URLS > 公共 STUN（开发兜底）
- 房间级别的信令与验证示例（SEA）
- 默认关闭 Gun UDP 组播，避免与 TURN/UDP 冲突

### 实现说明
- 内嵌 STUN/TURN 由 node-turn 驱动，默认使用 TURN_PORT（UDP，默认 8765）
- 如果设置了 TURN_USERNAME/TURN_CREDENTIAL，则 /ice 会返回 turn: 条目；否则只返回 STUN，避免开放中继
- HTTP 端口占用时会自动递增；TURN 端口独立，可在 .env 调整

### 如何扩展
- 启用 TURN 长期凭据：配置 .env 的 TURN_USERNAME/TURN_CREDENTIAL
- 自定义 ICE 优先级：PREFER_LOCAL_TURN=false 或直接提供 ICE_SERVERS（JSON）
- 生产环境建议使用独立 coturn（支持 UDP/TCP/TLS）并关闭内嵌 TURN
- 公网/跨 NAT：放行 UDP TURN_PORT 以及 TURN_MIN_PORT–TURN_MAX_PORT 范围；NAT 场景设置 TURN_PUBLIC_IP

### 加强或替换加密方式
- WebRTC 默认 DTLS-SRTP 加密；若需应用层 E2EE：
  - 使用 Insertable Streams（需浏览器支持与 crossOriginIsolated 环境）
  - 服务端可增加 COOP/COEP 头以启用 crossOriginIsolated：
    - Cross-Origin-Opener-Policy: same-origin
    - Cross-Origin-Embedder-Policy: require-corp
  - 在 RTCRtpSender/Receiver 上注入加密/解密变换；密钥由 SEA/KDF 或其他 KMS 提供
  - 提供能力检测与 UI 反馈，不支持时降级到基础加密
- 你也可以替换为自己的 E2EE 方案，但建议采用审计过的加密原语，并设计好密钥轮换

### 常见问题
- 端口占用（EADDRINUSE）：调整 RELAY_PORT 或 TURN_PORT，或释放占用进程
- 候选显示本地地址：这是正常的直连优先策略
- E2EE Type error：多为浏览器不支持或未启用跨源隔离，建议加能力检测或 COOP/COEP

### 生产建议
- 互联网场景优先使用 coturn（配合 REST 鉴权/HMAC）
- 收紧端口与防火墙策略，定期轮换凭据

### 我的补充
- 内嵌 STUN/TURN 适合 LAN 和自托管快速演示；大规模或公网中继请优先 coturn
- /ice 的动态能力有利于快速实验与灰度发布，有需要也可以加“仅走 TURN”的前端开关便于调试