<script setup>
import { ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import { gunAvatar } from '#composables'
import { useSteganography } from './useSteganography'

const { error, embedInBase64, extractFromFile } = useSteganography()

const message = ref('')
const extractedData = ref(null)
const imageFile = ref(null)

const props = defineProps({
  pub: { type: String, required: true }
})

const avatarWithEmbed = computedAsync(async () => {
  if (!message.value) return ''
  const base64 = gunAvatar({
    pub: props.pub,
    size: 100,
    round: true,
  })
  // Pass message as an object with proper structure
  return await embedInBase64(base64, { text: message.value })
})

async function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return
  imageFile.value = file
  extractedData.value = await extractFromFile(file)
}
</script>

<template lang='pug'>
.flex.flex-wrap.gap-4.p-4
  .flex.flex-col.gap-2
    .text-lg Embed
    input.border.rounded.p-2(v-model="message" placeholder="Enter message to embed")
    img.w-64.h-64.object-contain(v-if="avatarWithEmbed" :src="avatarWithEmbed")
    p.text-red-500.text-sm(v-if="error") {{ error }}
  .flex.flex-col.gap-2
    .text-lg Extract
    input.border.rounded(type="file" @change="handleFileUpload" accept="image/*")
    p.text-xs.leading-loose.bg-gray-100.bg-op-20.p-2.rounded(v-if="extractedData") {{ extractedData }}
</template>