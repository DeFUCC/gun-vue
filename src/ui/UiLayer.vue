<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  offset: { type: String, default: '60px' },
  back: { type: Boolean, default: true }
})
const emit = defineEmits(['close'])
const dialog = ref(null)

watch(() => props.open, (isOpen) => {
  isOpen ? dialog.value?.showModal() : dialog.value?.close()
})
</script>

<template lang="pug">
dialog.rounded-2xl.shadow-2xl.overflow-y-scroll.max-h-88vh.max-w-98vw.overscroll-y-none.bg-light-200.bg-op-90.dark-bg-dark-200.dark-bg-op-90.backdrop-blur.dark-text-white(
  ref="dialog"
  @click="back && $event.target === dialog && $emit('close')"
  :style="{ marginTop: offset }"
  style="scrollbar-width: thin;scrollbar-gutter: stable;"
)
  slot
</template>


<style lang="postcss" scoped>
dialog::backdrop {
  @apply backdrop-blur bg-light-400/30 dark-bg-dark-400/30
}
</style>