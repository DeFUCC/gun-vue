<script setup>
import { useDraw } from '@composables'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import 'floating-vue/dist/style.css'

const props = defineProps({
  content: { type: String, default: '' }
})


</script>

<template lang="pug">
svg.absolute.touch-none.pointer-events-none.w-full.h-full.top-0.bottom-0.left-0.right-0(v-html="content")
</template>
