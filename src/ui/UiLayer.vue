<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  offset: { type: String, default: '' },
  closeButton: { type: Boolean, default: true },
  back: { type: Boolean, default: true }
})
const emit = defineEmits(['close'])

const dialog = ref(null)

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    dialog.value?.showModal()
  } else {
    dialog.value?.close()
  }
})

const handleClick = (e) => {
  if (props.back && e.target === dialog.value) {
    emit('close')
  }
}
</script>

<template lang="pug">
dialog.modal-dialog.rounded-2xl.shadow-2xl.overflow-y-scroll.max-h-88vh.max-w-98vw.overscroll-y-none(ref="dialog" @click="handleClick" :style="{ marginTop: offset || '10vh' }")
  slot
</template>

<style lang="postcss" scoped>
.modal-dialog {
  @apply p-2 bg-light-200 bg-opacity-90 dark-bg-dark-200 dark-bg-op-90 backdrop-filter backdrop-blur dark-text-white;

  &::backdrop {
    @apply backdrop-blur bg-light-400/30 dark-bg-dark-400/30
  }
}
</style>