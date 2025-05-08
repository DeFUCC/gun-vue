<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUser } from '../composables'
import UiLayer from '../ui/UiLayer.vue'
import { onStartTyping, useFocus } from '@vueuse/core'

const { user } = useUser()

const tagModes = ['think', 'about'] as const
type TagMode = typeof tagModes[number]

const currentMode = ref<'default' | TagMode>('default')


const message = ref('')

const aboutTags = ref<string[]>([])
const thinkTags = ref<string[]>([])


const emit = defineEmits<{ submit: (payload: string) => void }>()


function setMode(mode: TagMode) {
  currentMode.value = mode
  message.value = ''
}


function handleConfirm() {
  const text = message.value.trim()
  if (!text) {
    message.value = ''
  currentMode.value = 'default'
  }

  if (currentMode.value === 'about') {
    aboutTags.value.push(text)
  } else if (currentMode.value === 'think') {
    thinkTags.value.push(text)
  }

  message.value = ''
  currentMode.value = 'default'
}

function send() {

  const text = message.value.trim()
  let payload = ''
  aboutTags.value.forEach(t => payload += `<about>${t}</about>\n`)
  thinkTags.value.forEach(t => payload += `<think>${t}</think>\n`)
  if (text) payload += text
  emit('submit', payload)

  message.value = ''
  aboutTags.value = []
  thinkTags.value = []
}


const fileInput = ref<HTMLInputElement | null>(null)
function triggerImageUpload() {
  fileInput.value?.click()
}
function onFileChange(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (!files?.length) return
  const reader = new FileReader()
  reader.onload = () => emit('submit', reader.result as string)
  reader.readAsDataURL(files[0])
  (e.target as HTMLInputElement).value = ''
}


function removeAbout(i: number) { aboutTags.value.splice(i, 1) }
function removeThink(i: number) { thinkTags.value.splice(i, 1) }


const textRef = ref<HTMLTextAreaElement>()
const { focused } = useFocus(textRef)
onStartTyping(() => { if (!focused.value) focused.value = true })
onMounted(() => { focused.value = true })
</script>

<template>
  <UiLayer />
  <div v-if="user.pub" class="wrapper">

    <div class="meta-tags" v-if="aboutTags.length || thinkTags.length">
      <span v-for="(t,i) in aboutTags" :key="`a${i}`" class="tag about">
        {{ t }} <button class="remove-btn" @click="removeAbout(i)">×</button>
      </span>
      <span v-for="(t,i) in thinkTags" :key="`t${i}`" class="tag think">
        {{ t }} <button class="remove-btn" @click="removeThink(i)">×</button>
      </span>
    </div>


    <input type="file" accept="image/*" ref="fileInput" class="file-input" @change="onFileChange" />

  
    <div class="toolbar">

      <button
        class="toolbar-button"
        :class="{ active: currentMode === 'think' }"
        @click="setMode('think')"
      >
      <div class="i-fluent-chat-sparkle-28-regular"></div>
      </button>
      <button
        class="toolbar-button"
        :class="{ active: currentMode === 'about' }"
        @click="setMode('about')"
      >
      <div class="i-fluent-attach-12-filled"></div>
      </button>
   
      <button class="toolbar-button" @click="triggerImageUpload">
        <div class="i-streamline-ai-generate-landscape-image-spark"></div>
      </button>
    </div>


    <div class="bottom-bar ">
      <textarea
        v-model="message"
        ref="textRef"
        class="message-input"
        :class="currentMode"
        :placeholder="
          currentMode === 'default'
            ? ''
            : currentMode === 'think'
              ? '  '
              : '  '
        "
        @keydown.enter.prevent.stop="
          currentMode === 'default' ? send() : handleConfirm()
        "
      >
    
    </textarea>
    
    <button
        v-if="currentMode !== 'default'"
        class="confirm-button"
        @click="handleConfirm"
      >
      <div class="i-fluent-checkmark-12-filled"></div>
    
    </button>
      <button class="send-button" @click="send">

        <div class="i-streamline-mail-send-email-send-email-paper-airplane"></div>

      </button>
    </div>
  </div>
  <div v-else class="login-container">
    <button class="login-button" @click="user.auth = !user.auth">Log in to post messages</button>
  </div>
</template>

<style scoped>
.i-streamline-ai-generate-landscape-image-spark {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 14 14' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cg fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M.576 6.733a6.5 6.5 0 0 1 1.164-.104c1.58 0 3.027.563 4.154 1.5'/%3E%3Cpath d='M5.076 10.629h-3.5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3.5'/%3E%3Cpath d='M6.326 5.629a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5m1.014 4.934c-.351-.061-.351-.565 0-.626a3.18 3.18 0 0 0 2.558-2.45l.021-.097c.076-.347.57-.349.649-.003l.026.113a3.19 3.19 0 0 0 2.565 2.435c.353.062.353.568 0 .63A3.19 3.19 0 0 0 10.594 13l-.026.113c-.079.346-.573.344-.649-.003l-.021-.097a3.18 3.18 0 0 0-2.558-2.45'/%3E%3C/g%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}
.i-fluent-chat-sparkle-28-regular {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 28 28' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M18.171 6.829a3.16 3.16 0 0 1 .761 1.238l.498 1.53a.605.605 0 0 0 1.14 0l.498-1.53a3.15 3.15 0 0 1 1.998-1.996l1.53-.497a.605.605 0 0 0 0-1.14l-.03-.008l-1.531-.497a3.15 3.15 0 0 1-1.998-1.996L20.54.403a.604.604 0 0 0-1.14 0l-.498 1.53l-.013.038a3.15 3.15 0 0 1-1.955 1.958l-1.53.497a.605.605 0 0 0 0 1.14l1.53.497c.467.156.89.418 1.237.766m8.65 3.529l.918.298l.019.004a.362.362 0 0 1 0 .684l-.919.299a1.9 1.9 0 0 0-1.198 1.197l-.299.918a.363.363 0 0 1-.684 0l-.299-.918a1.89 1.89 0 0 0-1.198-1.202l-.919-.298a.362.362 0 0 1 0-.684l.919-.299a1.9 1.9 0 0 0 1.18-1.197l.299-.918a.363.363 0 0 1 .684 0l.298.918a1.89 1.89 0 0 0 1.199 1.197M14 2c1.198 0 2.356.176 3.448.503a2.1 2.1 0 0 1-.839.496l-1.52.5q-.06.021-.118.045Q14.49 3.5 14 3.5C8.201 3.5 3.5 8.201 3.5 14c0 1.884.496 3.65 1.363 5.178a.75.75 0 0 1 .07.575l-1.318 4.634l4.634-1.318a.75.75 0 0 1 .576.07A10.45 10.45 0 0 0 14 24.5c5.499 0 10.01-4.227 10.463-9.61a1.37 1.37 0 0 0 1.523-.31C25.684 20.938 20.433 26 14 26a11.95 11.95 0 0 1-5.637-1.404l-4.77 1.357a1.25 1.25 0 0 1-1.544-1.544l1.356-4.77A11.95 11.95 0 0 1 2 14C2 7.373 7.373 2 14 2'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}
.i-fluent-attach-12-filled {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 12 12' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M8.977 2.806a1.69 1.69 0 0 0-2.304.082L3.28 6.28a.75.75 0 1 1-1.06-1.06l3.392-3.392a3.192 3.192 0 1 1 4.458 4.569l-4.724 4.496A1.923 1.923 0 0 1 2.66 8.14l4.243-4.244a.75.75 0 1 1 1.06 1.061l-4.24 4.244a.423.423 0 0 0 .59.605L9.035 5.31a1.69 1.69 0 0 0-.058-2.504'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}

.i-fluent-checkmark-12-filled {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 12 12' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='currentColor' d='M9.765 3.205a.75.75 0 0 1 .03 1.06l-4.25 4.5a.75.75 0 0 1-1.075.015L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.705 1.704l3.72-3.939a.75.75 0 0 1 1.06-.03'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}
.i-streamline-mail-send-email-send-email-paper-airplane {
  --un-icon: url("data:image/svg+xml;utf8,%3Csvg viewBox='0 0 14 14' width='1.2em' height='1.2em' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' d='M5.82 11L8 13.17a1.1 1.1 0 0 0 1.05.3a1.12 1.12 0 0 0 .81-.74L13.44 2A1.12 1.12 0 0 0 12 .56L1.27 4.14A1.12 1.12 0 0 0 .53 5a1.1 1.1 0 0 0 .3 1l2.74 2.74l-.09 3.47ZM13.12.78L3.57 8.74'/%3E%3C/svg%3E");
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}


.wrapper { display: flex; flex-direction: column; margin: 10px; }

.meta-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.5rem 10px; }
.tag { display: inline-flex; align-items: center; padding: 0.25rem 0.5rem; border-radius: 12px; font-size: 0.85rem; }
.tag.about { background: rgb(1, 255, 238);color: #000; }
.tag.think { background: #3d3d3d; color: #fff;}
.remove-btn { background:none; border:none; margin-left:0.25rem; cursor:pointer; }

.file-input { display: none; }

.toolbar { display: flex; gap:0.5rem; padding:0.5rem 10px; background:#000; border-radius:8px 8px 0px 0px; margin:0px; justify-content:space-around; }
.toolbar-button { background:none; border:none; padding:0.5rem 1rem; color:#fff; cursor:pointer; }
.toolbar-button.active { background:#444; border-radius:4px; }

.bottom-bar { display:flex; gap:0.5rem; padding:5px; background:#2d2d2d; border-radius:0 0 8px 8px; align-items:center; }
.message-input { flex:1; padding:0.5rem; border-radius:10px; resize:none; outline:none; font-size:1rem; line-height:1.4; color:#fff; border:2px solid transparent; }




.message-input.default { background:#444;  }
.message-input.think { background:#000000; color: #fff; }
.message-input.about { background:rgb(1, 255, 238);color: black; }
.confirm-button { padding:0.5rem 1rem; border:none; border-radius:6px;  color:#009dff; cursor:pointer; position:absolute;right: 9%;font-size: 29px;}
.send-button { padding:0.5rem 1rem; border:none; border-radius:6px;  color:#fff; cursor:pointer; position:absolute;right: 3.9%;font-size: 19px;}
.send-button:hover { opacity:0.8; color:#009dff;}

.login-container { padding:1rem; display:flex; justify-content:center; }
.login-button { padding:0.5rem 1rem; border:none; border-radius:6px; background:#007bff; color:#fff; cursor:pointer; }
.login-button:hover { background:#006ae6; }
</style>