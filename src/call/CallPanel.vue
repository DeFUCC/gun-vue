<script setup>
import { useCall } from './useCall.js'

const state = useCall()

const i18n = {
  ui_language: { en: 'Language', zh: '语言' },
  english: { en: 'English', zh: '英文' },
  chinese: { en: 'Chinese', zh: '中文' },
  room_key: { en: 'Room Key', zh: '房间密钥' },
  room_key_tip: { en: 'Tip: Both sides can join the same room by sharing the same room public key (pub). Sharing the full key pair is recommended to enable E2EE.', zh: '提示：双方使用相同的房间公钥（pub）即可进入同一房间。推荐共享完整密钥对以启用 E2EE。' },
  generate_keypair: { en: 'Generate Key Pair', zh: '生成密钥对' },
  enable_e2ee: { en: 'Enable End-to-End Encryption', zh: '启用端到端加密' },
  need_full_keypair: { en: 'A full key pair is required to join the room.', zh: '需要完整密钥对才能加入房间' },
  device_selection: { en: 'Device Selection', zh: '设备选择' },
  microphone: { en: 'Microphone', zh: '麦克风' },
  camera: { en: 'Camera', zh: '摄像头' },
  enable_mic: { en: 'Enable Microphone', zh: '启用麦克风' },
  enable_cam: { en: 'Enable Camera', zh: '启用摄像头' },
  device_selection_help: { en: 'Pick your desired input devices before starting. You can disable mic or camera as needed.', zh: '开始前请选择输入设备。你也可以根据需要关闭麦克风或摄像头。' },
  start: { en: 'Start', zh: '开始' },
  stop: { en: 'Stop', zh: '停止' },
  controls_help: { en: 'Start will fetch ICE, set up media and signaling, and join the room. Stop will close connections and release devices.', zh: '“开始”将获取 ICE、设置媒体与信令并加入房间；“停止”将关闭连接并释放设备。' },
  local_video: { en: 'Local Video', zh: '本地视频' },
  local_video_help: { en: 'If you see a black screen, check camera permission or disable the camera in Device Selection.', zh: '如果看到黑屏，请检查摄像头权限，或在“设备选择”中关闭摄像头。' },
  remote_videos: { en: 'Remote Videos', zh: '远端视频' },
  remote_videos_help: { en: 'Participants you are connected with will appear here. If you see nothing, verify signaling server and ICE.', zh: '你连接到的参与者会显示在这里。如果没有，请检查信令服务器和 ICE 配置。' },
  connection_status: { en: 'Connection Status', zh: '连接状态' },
  connected: { en: 'Connected', zh: '已连接' },
  not_connected: { en: 'Not connected', zh: '未连接' },
  peers: { en: 'Peers', zh: '节点数' },
  connection_status_help: { en: 'Peers shows the number of other participants in the room. ICE/connection state changes are logged below.', zh: 'Peers 显示房间内的其他参与者数量。ICE 与连接状态变化会记录在日志中。' },
  logs: { en: 'Logs', zh: '日志' },
  logs_help: { en: 'Recent events, ICE candidates, and errors will appear here to help debugging.', zh: '最近事件、ICE 候选与错误会显示在这里，便于调试。' },
  auth_failed: { en: 'Authentication failed', zh: '认证失败' }
}
const t = (k)=> (i18n[k] && (i18n[k][state.lang] || i18n[k].en)) || k
</script>

<template lang="pug">
.flex.flex-col.h-full.gap-4
  //- 上半部分：视频窗口（本地 + 远程）
  .flex-none(style="height:50vh")
    .grid.gap-4(style="grid-template-columns: 1fr 1fr;" class="h-full")
      //- 本地视频
      .relative.border.rounded.bg-black.h-full.overflow-hidden
        .absolute.top-2.left-2.z-10.text-white.text-sm.font-bold {{ t('local_video') }}
        video#localVideo.w-full.h-full.object-cover(autoplay playsinline muted :srcObject="state.localStream")
      //- 远程视频
      .relative.border.rounded.bg-black.h-full.flex.flex-col
        .p-2.text-white.text-sm.font-bold {{ t('remote_videos') }} ({{ state.remotePeers.length }})
        .flex-1.overflow-auto.p-2
          .grid.gap-3(style="grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));")
            .relative.border.rounded.bg-black.h-40.overflow-hidden(v-for="pid in state.remotePeers" :key="pid")
              video(:id="`remote-${pid}`" playsinline autoplay :srcObject="state.remoteStreams[pid]" class="w-full h-full object-cover")
              .absolute.top-1.left-1.bg-black.bg-opacity-50.text-white.text-xs.px-1.rounded {{ pid }}
        .px-2.pb-2.text-xs.text-gray-300 {{ t('remote_videos_help') }}

  //- 下半部分：工具栏（除视频外的所有内容）
  .flex-1.overflow-auto
    .grid.gap-4(style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));")
      //- 设备与控制
      .space-y-2
        h3.text-lg.font-bold {{ t('device_selection') }}
        .space-y-2
          label {{ t('microphone') }}
            select(v-model="state.selectedAudioIn")
              option(v-for="d in state.devices.audioIn" :key="d.deviceId" :value="d.deviceId") {{ d.label || d.deviceId }}
          label {{ t('camera') }}
            select(v-model="state.selectedVideoIn")
              option(v-for="d in state.devices.videoIn" :key="d.deviceId" :value="d.deviceId") {{ d.label || d.deviceId }}
          label
            input(type="checkbox" v-model="state.enableMic")
            |  {{ t('enable_mic') }}
          label
            input(type="checkbox" v-model="state.enableCam")
            |  {{ t('enable_cam') }}
        .text-xs.text-gray-500 {{ t('device_selection_help') }}
        .flex.gap-2
          button.px-3.py-1.rounded.bg-blue-600.text-white(@click="state.start()") {{ t('start') }}
          button.px-3.py-1.rounded.bg-red-600.text-white(@click="state.stop()") {{ t('stop') }}
        .text-xs.text-gray-500 {{ t('controls_help') }}

      //- 房间密钥
      .space-y-2
        h3.text-lg.font-bold {{ t('room_key') }}
        .flex.gap-2.items-center
          button.px-3.py-1.rounded.bg-green-600.text-white(@click="state.generatePair") {{ t('generate_keypair') }}
          label
            input(type="checkbox" v-model="state.enableE2EE")
            |  {{ t('enable_e2ee') }}
        textarea.w-full.p-2.border.rounded(rows="6" v-model="state.pairText")
        .text-xs.text-gray-500 {{ t('room_key_tip') }}

      //- 手动信令地址
      .space-y-2
        h3.text-lg.font-bold Manual Signaling
        input.w-full.p-2.border.rounded(placeholder="http://localhost:8765" v-model="state.signalingOrigin" @change="state.saveSignalingOrigin")
        .flex.gap-2
          button.px-3.py-1.rounded.bg-amber-600.text-white(@click="state.fetchIce") Load ICE
          button.px-3.py-1.rounded.bg-gray-600.text-white(@click="state.saveSignalingOrigin") Save
        .text-xs.text-gray-600(v-if="state.iceServers?.length") ICE: {{ state.iceServers.map(s=>s.urls).join(', ') }}
        .text-xs.text-gray-500 Default empty means using built-in or env-configured endpoints.

      //- 语言
      .space-y-2
        h3.text-lg.font-bold {{ t('ui_language') }}
        select.border.rounded.px-2.py-1.text-sm(v-model="state.lang")
          option(value="en") {{ t('english') }}
          option(value="zh") {{ t('chinese') }}

      //- 连接状态
      .space-y-2
        h3.text-lg.font-bold {{ t('connection_status') }}
        .text-sm {{ state.connected ? t('connected') : t('not_connected') }}
          span.badge {{ t('peers') }}: {{ state.others.length }}
        .text-xs.text-gray-500 {{ t('connection_status_help') }}

      //- 日志
      .space-y-2(style="grid-column: 1 / -1;")
        h3.text-lg.font-bold {{ t('logs') }}
        .text-xs.text-gray-500 {{ t('logs_help') }}
        .h-48.overflow-auto.text-xs.bg-gray-50.p-2.border.rounded.text-gray-800.dark-bg-dark-800.dark-text-gray-100
          div(v-for="(l,i) in state.log" :key="i") [{{ l.t }}] {{ l.m }}
</template>