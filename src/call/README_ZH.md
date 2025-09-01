# Call 模块 — 使用与测试

语言：中文（当前）· English → ./README.md

本目录包含通话面板（Call Panel）相关代码与逻辑。你可以通过下述地址直接访问和测试：

- 测试地址：http://localhost:3342/#/call

提示：如果 3342 端口被占用，开发服务器可能会自动切换到其他端口。此时请以终端输出为准。

## 启动前端

如果你尚未启动前端开发服务器：

1. 打开终端并进入应用目录：`cd gun-vue/app`
2. 启动本地开发服务（二选一）：
   - `pnpm -w exec vite --host`
   - 或 `npm run dev`
3. 在浏览器访问：http://localhost:3342/#/call

## 推荐的 Relay（信令 + 媒体/ICE）

建议配合仓库内自带的 relay 服务进行测试，它集成了 Socket.IO 信令与内嵌 STUN/TURN，并提供 /ice 接口：

- English（Relay）：../../gun-vue-call-relay/README.md
- 中文（Relay）：../../gun-vue-call-relay/README_ZH.md

该 relay 使用“单地址/单端口”同时提供信令与 ICE，便于本地/自托管测试端到端通话（信令 + 媒体）。

快速思路（完整步骤请见 Relay 文档）：
- 准备 Node.js 18+
- 视需要配置 .env 并启动 relay
- 验证 http://localhost:8765/ 与 `curl http://localhost:8765/ice`

## 界面与功能概览

上半部分（固定高度）：
- 本地视频（左侧）
- 远端视频（右侧，多路网格）

下半部分（可滚动）：
- 设备选择（麦克风/摄像头与启用开关）
- 控制按钮（Start/Stop）
- 房间密钥（Generate Key Pair、Enable End‑to‑End Encryption）
- 手动信令（输入 relay 地址、Load ICE、Save）
- 语言切换
- 连接状态（已连接、节点数）
- 日志（事件/ICE/错误）

## 基本使用流程

1) 打开 http://localhost:3342/#/call

2) 设备选择：选择麦克风与摄像头（可按需关闭其中之一）。

3) 房间密钥（可选但推荐）：
- 点击 Generate Key Pair 生成房间密钥对，或粘贴已有密钥对
- 若双方共享完整密钥对，可勾选 Enable End‑to‑End Encryption 启用端到端加密

4) 手动信令（建议与 relay 搭配）：
- 输入你的 relay 源地址（例如 http://localhost:8765）
- 点击 Load ICE 从 relay 的 /ice 拉取 ICE 配置；随后点击 Save 保存

5) 点击 Start，并按提示授予浏览器麦克风/摄像头权限。

6) 在另一台设备或浏览器打开同一页面，使用相同房间密钥加入同一房间。启用 E2EE 时，请确保双方共享完整密钥对。

7) 连接成功后，你会在“远端视频”区域看到对方的视频流。

8) 点击 Stop 退出通话并释放设备。

## 常见问题与排查

- 本地视频黑屏：
  - 检查摄像头权限
  - 在“设备选择”中确认摄像头选择正确
  - 如无需要，可关闭摄像头仅进行音频通话

- 看不到远端视频：
  - 双方是否在同一房间（使用相同房间密钥/密钥对）
  - 信令服务器地址是否可达
  - 是否通过 Relay 成功加载 ICE；NAT/防火墙场景建议配置 STUN/TURN
  - 查看“日志”中的提示或错误

- 端到端加密（E2EE）：
  - 需要完整密钥对（pub + priv）；仅共享公钥不足以启用 E2EE

- 浏览器兼容性：
  - 建议使用最新版 Chrome/Edge/Safari；不同浏览器的 WebRTC 行为可能存在差异

## 开发者说明

- 手动信令与 ICE：
  - “Load ICE” 会从 relay 的 /ice 接口获取配置，并在界面显示简要信息

- 本地持久化：
  - 手动信令地址会保存到浏览器 localStorage，刷新页面仍会保留

- 远端视频渲染：
  - 远端流会与各自的 peerId 关联并显示在“远端视频”网格中