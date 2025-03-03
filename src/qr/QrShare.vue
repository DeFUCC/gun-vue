<script setup lang="ts">
import { useBrowserLocation, useClipboard, useShare } from '@vueuse/core'
import { ref, computed } from 'vue'
import { UiLayer, QrShow } from '../components'

const location = useBrowserLocation()
const inputUrl = ref(location.value.href + location.value.search)
const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

// Validate URL to ensure it's safe (internal or valid external)
const isValidUrl = computed(() => {
  try {
    const url = new URL(inputUrl.value)
    // Allow only http/https protocols
    if (!['http:', 'https:'].includes(url.protocol)) return false
    // Additional safety checks can be added here
    return true
  } catch {
    return false
  }
})

// Check if URL is internal (same origin)
const isInternalUrl = computed(() => {
  try {
    const url = new URL(inputUrl.value)
    return url.origin === window.location.origin
  } catch {
    return false
  }
})

const navigateToUrl = () => {
  if (isValidUrl.value) {
    if (isInternalUrl.value) {
      window.location.href = inputUrl.value // Internal navigation
    } else {
      window.open(inputUrl.value, '_blank', 'noopener,noreferrer') // Safe external navigation
    }
  }
}
</script>

<template lang="pug">
.flex.flex-col.bg-light-400.dark-bg-dark-400.gap-4.p-4
  qr-show.max-w-full(:data="inputUrl")
  form.flex.flex-col.items-center(@submit.prevent.stop="navigateToUrl")
    input.w-full.text-md.break-all.max-w-420px.font-mono.op-70.px-2.py-1(
      v-model="inputUrl"
      placeholder="Enter or paste URL"
      :class="{ 'border-green-500': isValidUrl, 'border-red-500': inputUrl && !isValidUrl }"
      )
    .flex.text-lg.my-2.gap-2
      button.button.text-lg.font-normal.items-center(
        v-if="isValidUrl"
        type="submit"
        :class="{ 'text-green-500': isInternalUrl }"
        )
        .i-la-check
        .ml-2 Go to URL
      button.button.text-lg.font-normal.items-center(v-if="canCopy" @click="copy(inputUrl)")
        .i-la-copy
        .ml-2(v-if="copied") Copied!
        .ml-2(v-else) Copy
      button.button.text-lg.font-normal.items-center(v-if="canShare")
        .i-la-share(@click="share({ title: 'Gun-Vue demo', text: 'Look what I found!', url: inputUrl })")
        .ml-2 Share
</template>