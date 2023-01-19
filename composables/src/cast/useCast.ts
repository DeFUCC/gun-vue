import { useTimestamp } from '@vueuse/core'
import { useDevicesList, useEventListener, useStorage } from '@vueuse/core'
import { ref, reactive, computed, watch, shallowRef, nextTick } from 'vue'
import type { Ref } from 'vue'
import type { Options } from 'recordrtc'

export const currentCamera: Ref<string> = useStorage('cast-camera', 'default')
export const currentMic: Ref<string> = useStorage('cast-mic', 'default')

export const recordingName = ref('')
export const recordCamera = ref(true)
export const mimeType: Ref<string> = useStorage('slidev-record-mimetype', 'video/webm')

export const mimeExtMap = {
  'video/webm': 'webm',
  'video/webm;codecs=h264': 'mp4',
  'video/x-matroska;codecs=avc1': 'mkv',
}

export type MimeTypes = 'video/webm' | 'video/webm;codecs=h264' | 'video/x-matroska;codecs=avc1' | undefined

export function getFilename(media: string, mimeType: MimeTypes) {
  const d = new Date()

  const pad = (v: number) => `${v}`.padStart(2, '0')

  const date = `${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`

  const ext = mimeType ? mimeExtMap[mimeType] : 'webm'

  return `${[date, media, recordingName.value].filter(el => !!el).join('-')}.${ext}`
}

export function getSupportedMimeTypes() {
  if (MediaRecorder && typeof MediaRecorder?.isTypeSupported === 'function') {
    return Object.keys(mimeExtMap).filter(mime => MediaRecorder.isTypeSupported(mime))
  }
  return []
}

export const fileNames = reactive({
  screen: computed(() => getFilename('screen', mimeType.value as MimeTypes)),
  camera: computed(() => getFilename('camera', mimeType.value as MimeTypes)),
})

export const {
  devices,
  videoInputs: cameras,
  audioInputs: microphones,
  ensurePermissions: ensureDevicesListPermissions,
} = useDevicesList({
  onUpdated: function () {
    if (currentCamera.value !== 'none') {
      if (!cameras.value.find(i => i.deviceId === currentCamera.value))
        currentCamera.value = cameras.value[0]?.deviceId || 'default'
    }
    if (currentMic.value !== 'none') {
      if (!microphones.value.find(i => i.deviceId === currentMic.value))
        currentMic.value = microphones.value[0]?.deviceId || 'default'
    }
  },
})

export function download(name: string, url: string) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', name)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function useRecording() {
  const recording = ref(false)
  const recordingStartedAt = ref(0)

  const timestamp = useTimestamp()

  watch(recording, r => r ? recordingStartedAt.value = Date.now() : recordingStartedAt.value = 0)

  const recordingTime = computed(() => {
    if (!recordingStartedAt.value) return 0
    return timestamp.value - recordingStartedAt.value
  })

  const showAvatar = ref(false)

  const recorderCamera = shallowRef()
  const recorderSlides = shallowRef()
  const streamCamera = shallowRef()
  const streamCapture = shallowRef()
  const streamSlides = shallowRef()

  const config: Options = {
    type: 'video',
    bitsPerSecond: 4 * 256 * 8 * 1024,
    // Extending recording limit as default is only 1h (see https://github.com/muaz-khan/RecordRTC/issues/144)
    timeSlice: 24 * 60 * 60 * 1000,
  }

  async function toggleAvatar() {
    if (currentCamera.value === 'none')
      return

    if (showAvatar.value) {
      showAvatar.value = false
      if (!recording.value)
        closeStream(streamCamera)
    }
    else {
      await startCameraStream()
      if (streamCamera.value)
        showAvatar.value = !!streamCamera.value
    }
  }

  async function startCameraStream() {
    await ensureDevicesListPermissions()
    await nextTick()
    if (!streamCamera.value) {
      if (currentCamera.value === 'none' && currentMic.value === 'none')
        return

      streamCamera.value = await navigator.mediaDevices.getUserMedia({
        video: currentCamera.value === 'none' || recordCamera.value !== true
          ? false
          : {
            deviceId: currentCamera.value,
          },
        audio: currentMic.value === 'none'
          ? false
          : {
            deviceId: currentMic.value,
          },
      })
    }
  }

  watch(currentCamera, async (v) => {
    if (v === 'none') {
      closeStream(streamCamera)
    }
    else {
      if (recording.value)
        return
      // restart camera stream
      if (streamCamera.value) {
        closeStream(streamCamera)
        await startCameraStream()
      }
    }
  })

  async function startRecording(customConfig = {}) {
    await ensureDevicesListPermissions()
    const { default: Recorder } = await import('recordrtc')
    await startCameraStream()

    streamCapture.value = await navigator.mediaDevices.getDisplayMedia({
      video: {
        // aspectRatio: 1.6,
        frameRate: 30,
        width: 3840,
        height: 2160,
      },
    })
    streamCapture.value.addEventListener('inactive', stopRecording)

    // We need to create a new Stream to merge video and audio to have the inactive event working on streamCapture
    streamSlides.value = new MediaStream()
    streamCapture.value.getVideoTracks().forEach((videoTrack: MediaStreamTrack) => streamSlides.value.addTrack(videoTrack))

    // merge config
    Object.assign(config, customConfig)

    if (streamCamera.value) {
      const audioTrack = streamCamera.value.getAudioTracks()?.[0]
      if (audioTrack) {
        streamSlides.value.addTrack(audioTrack)
      }


      recorderCamera.value = new Recorder(
        streamCamera.value,
        config,
      )
      recorderCamera.value.startRecording()
    }

    recorderSlides.value = new Recorder(
      streamSlides.value,
      config,
    )

    recorderSlides.value.startRecording()
    recording.value = true
  }

  async function stopRecording() {
    recording.value = false
    recorderCamera.value?.stopRecording(() => {
      if (recordCamera.value) {
        const blob = recorderCamera.value.getBlob()
        const url = URL.createObjectURL(blob)
        download(getFilename('camera', config.mimeType as MimeTypes), url)
        window.URL.revokeObjectURL(url)
      }
      recorderCamera.value = undefined
      if (!showAvatar.value)
        closeStream(streamCamera)
    })
    recorderSlides.value?.stopRecording(() => {
      const blob = recorderSlides.value.getBlob()
      const url = URL.createObjectURL(blob)
      download(getFilename('screen', config.mimeType as MimeTypes), url)
      window.URL.revokeObjectURL(url)
      closeStream(streamCapture)
      closeStream(streamSlides)
      recorderSlides.value = undefined
    })
  }

  function closeStream(stream: Ref) {
    const s = stream.value
    if (!s)
      return
    s.getTracks().forEach((i: MediaStreamTrack) => {
      i.stop()
      s.removeTrack(i)
    })
    stream.value = undefined
  }

  function toggleRecording() {
    if (recording.value)
      stopRecording()
    else
      startRecording()
  }

  useEventListener('beforeunload', (event) => {
    if (!recording.value)
      return
    // eslint-disable-next-line no-alert
    if (confirm('Recording is not saved yet, do you want to leave?'))
      return
    event.preventDefault()
    event.returnValue = ''
  })

  return {
    recording,
    recordingTime,
    showAvatar,
    toggleRecording,
    startRecording,
    stopRecording,
    toggleAvatar,
    recorderCamera,
    recorderSlides,
    streamCamera,
    streamCapture,
    streamSlides,
  }
}

export const cast = useRecording()