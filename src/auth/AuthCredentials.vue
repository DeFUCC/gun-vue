<script setup lang="ts">
import { useUser, useAuth, gunAvatar } from '#composables'
import { AuthPass, QrShow } from '../components'
import { ref, computed } from 'vue'
import { useClipboard, useShare } from '@vueuse/core'

const emit = defineEmits(['close'])

const current = ref('pass')

const { user } = useUser()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

const { pass } = useAuth()


const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

const safePair = ref(true)

const encPair = computed(() => {
  return safePair.value ? pass?.safe?.enc : JSON.stringify(user.pair())
});

const href = computed(() => safePair.value ? pass.links.pass : pass.links.pair)

const png = computed(() => gunAvatar({ pub: user.pub, embed: encPair.value }))

const bookmarks = computed(() => generateBookmarkFiles(href.value))

function ensureDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = fileName
  link.target = '_blank'

  // Try HTML5 download
  const result = link.dispatchEvent(new MouseEvent('click'))

  // If download attribute fails, open in new tab as fallback
  if (!result) {
    window.open(dataUrl, '_blank')
  }
}

function downloadData(content: string, fileName: string, mimeType = 'text/plain') {
  try {
    // For data URLs (like PNG), use directly
    if (content.startsWith('data:')) {
      ensureDownload(content, fileName)
      return
    }

    // For text content, create a properly formatted data URL
    const base64 = btoa(unescape(encodeURIComponent(content)))
    const dataUrl = `data:${mimeType};charset=utf-8;base64,${base64}`
    ensureDownload(dataUrl, fileName)
  } catch (err) {
    console.warn('Download failed, trying share...', err)
    // Fallback to share API if available
    if (canShare) {
      share({
        title: fileName,
        text: content,
      })
    } else {
      // Last resort - open in new tab
      const blob = new Blob([content], { type: mimeType })
      window.open(URL.createObjectURL(blob), '_blank')
    }
  }
}

// Simplified download handlers
function downloadBookmark(bookmark) {
  if (!bookmark?.content || !bookmark?.extension) return
  downloadData(bookmark.content, `${user.name || 'account'}${bookmark.extension}`, bookmark.mime)
}

function downloadPng(dataUrl: string) {
  downloadData(dataUrl, `${user.name || 'avatar'}.png`)
}

function downloadJson(content: string) {
  downloadData(content, `${user.name || 'account'}.json`, 'application/json')
}

function generateBookmarkFiles(url, title = 'Bookmark') {


  // Windows .url file
  const urlContent = "[InternetShortcut]\n" +
    "URL=" + url;

  // macOS .webloc file
  const weblocContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
    "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">\n" +
    "<plist version=\"1.0\">\n" +
    "<dict>\n" +
    "  <key>URL</key>\n" +
    "  <string>" + url + "</string>\n" +
    "</dict>\n" +
    "</plist>";



  // Linux .desktop file
  const desktopContent = "[Desktop Entry]\n" +
    "Encoding=UTF-8\n" +
    "Type=Link\n" +
    "Name=" + title + "\n" +
    "URL=" + url;

  return {
    Win: {
      content: urlContent,
      extension: '.url',
      mime: 'application/internet-shortcut'
    },
    Mac: {
      content: weblocContent,
      extension: '.webloc',
      mime: 'application/x-apple-plist'
    },
    Linux: {
      content: desktopContent,
      extension: '.desktop',
      mime: 'application/x-desktop'
    }
  };
}

</script>

<template lang="pug">
.flex.flex-col.items-stretch.pb-4.border-1.border-dark-100.border-opacity-10.max-w-120.mx-auto.dark-bg-dark-200(v-if="user.is" :key="user.is")
  .mt-4.mx-6 Please make sure to safely store your cryptographic keypair to be able to use it again later
  auth-pass
  .flex.p-4.items-center.bg-dark-100.bg-opacity-20.mt-2.shadow-inset(v-if="pass?.safe?.enc")
    .flex.flex-col.w-34.items-center(:style="{ color: safePair ? 'green' : 'red' }")
      button.m-2.button.text-2xl(@click="safePair = !safePair")
        .i-la-lock(v-if="safePair")
        .i-la-unlock(v-else)
      .text-sm {{ safePair ? 'Encrypted' : 'Plain Text' }}
      .text-m Key Pair
    .flex.flex-wrap.gap-2.p-2
      button.button.items-center(@click="show('key')" :class="{ active: current == 'key' }")
        .i-la-envelope-open-text
        .px-2 Text
      button.button.items-center(
        :href="href" 
        target="_blank" 
        @click="show('link')" 
        :class="{ active: current == 'link' }"
        )
        .i-la-link
        .px-2 Link
      button.button.items-center(@click="show('qr')" :class="{ active: current == 'qr' }")
        .i-la-qrcode
        .px-2 QR

      button.button.items-center(@click="show('png')" :class="{ active: current == 'png' }")
        .i-la-user-circle
        .px-2 PNG
  .flex.w-full.justify-center.mt-4(v-if="current")
    transition(name="fade" mode="out-in")
      .p-2.flex.flex-col.w-full.items-start(v-if="current == 'key'", key="text")
        .flex.gap-2.items-center.mx-4
          button.button.items-center(
            v-if="canCopy" 
            @click="copy(encPair)"
            )
            .i-la-copy
            transition(name="fade" mode="out-in" appear)
              .px-2(v-if="copied") Copied!
              .px-2(v-else) Copy
          button.button.items-center(
            v-if="canShare" 
            :class="{ active: current == 'pass' }" 
            @click="share({ title: user.name || 'Gun-Vue keypair', text: encPair })"
            )
            .i-la-share
            .px-1 Share
          button.button.items-center(@click="downloadJson(encPair); current = null")
            .i-la-download
            .px-2 Download
        .w-full.p-4.text-sm.flex-1.rounded-xl.break-all.select-all(
          key="text",
        ) {{ encPair }}

      .p-2.flex.flex-col.items-center(v-else-if="current == 'png'" key="png")
        img.cursor-pointer.shadow-lg.rounded-full.hover-lightness-120.hover-shadow-2xl.-hover-translate-y-1.transition.active-translate-y-1( :src="png" @click="downloadPng(png)")
        .text-sm.op-50.text-center.m-4.max-w-50 Click the image to download the PNG file with your key embedded. You can use to login later. 

      .p-4.flex.flex-col.gap-2(
        key="link"
        v-else-if="current == 'link'") 
        .flex.flex-wrap.gap-2.items-center.mx-4
          button.button.items-center(
            v-if="canCopy" 
            @click="copy(href)"
            )
            .i-la-copy
            transition(name="fade" mode="out-in" appear)
              .px-2(v-if="copied") Copied!
              .px-2(v-else) Copy
          button.button.items-center(
            v-if="canShare" 
            :class="{ active: current == 'pass' }"
            @click="share({ title: user.name || 'Gun-Vue Login link', text: href })"
            )
            .i-la-share
            .px-1 Share

          button.button.items-center(
            v-for="(bookmark, b) in bookmarks" :key="bookmark?.content"
            @click="downloadBookmark(bookmark)"
            )
            .i-la-download
            .px-2 {{ b }}

        a.m-2.button.items-center.break-all(
          :href="href" 
          target="_blank" 
          @click="show('links')" 
          )
          .i-la-link
          .px-2.font-normal.font-mono.text-xs {{ href }}

      .p-4.flex.flex-col.gap-2.items-center(v-else-if="current == 'qr'" key="qr" )
        qr-show.max-w-600px(
          :data="safePair ? pass.links.pass : pass.links.pair"
          )
        .text-sm.op-50.text-center.mx-4.max-w-80 Make a screenshot to save the QR code for logging in later.
  slot
</template>

<style scoped></style>