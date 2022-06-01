<script setup>
import { useDraw } from '@composables'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import 'floating-vue/dist/style.css'

const svg = ref()

const { drauu, draw, loadCanvas } = useDraw()

onMounted(() => {
  drauu.mount(svg.value, svg.value.parentElement)
  loadCanvas()
})

onBeforeUnmount(() => {
  drauu.unmount()
})
</script>

<template lang="pug">
svg.absolute.w-full.h-full.top-0.bottom-0.left-0.right-0(ref="svg" :class="{ 'pointer-events-none': !draw.enabled, 'touch-none': draw.enabled }")
</template>
