<script setup vapor>
import { ref, watch } from 'vue'
import { fs } from './ZipGitFS.js'

const props = defineProps({
  path: { type: String, required: true }
})

const src = ref('')
const loading = ref(true)
const error = ref('')

const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']

function isImage(path) {
  return imageExts.some(ext => path.toLowerCase().endsWith(ext))
}

async function loadImage() {
  loading.value = true
  error.value = ''
  src.value = ''
  if (!isImage(props.path)) {
    error.value = 'Not an image file.'
    loading.value = false
    return
  }
  try {
    const data = await fs.readFile(props.path)
    let mime = 'image/png'
    if (props.path.endsWith('.jpg') || props.path.endsWith('.jpeg')) mime = 'image/jpeg'
    else if (props.path.endsWith('.gif')) mime = 'image/gif'
    else if (props.path.endsWith('.webp')) mime = 'image/webp'
    else if (props.path.endsWith('.svg')) mime = 'image/svg+xml'
    const blob = new Blob([data], { type: mime })
    src.value = URL.createObjectURL(blob)
  } catch (e) {
    error.value = 'Failed to load image.'
  } finally {
    loading.value = false
  }
}

watch(() => props.path, loadImage, { immediate: true })
</script>

<template lang='pug'>
img(:src="src" :alt="props.path")
</template>