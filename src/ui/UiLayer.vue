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
dialog.modal-dialog.layer(ref="dialog" @click="handleClick" :style="{ marginTop: offset || '10vh' }")
  button.button.fixed.right-4.top-4(
    v-if="closeButton"
    @click="$emit('close')"
  )
    .i-la-times
  slot
</template>

<style lang="postcss" scoped>
.modal-dialog {
  @apply p-4 m-0 bg-dark-200 bg-opacity-30 backdrop-filter backdrop-blur-sm dark-text-white;

  &::backdrop {
    @apply backdrop-blur bg-light-400/30 dark-bg-dark-400/30
  }
}

.layer {
  @apply bg-light-100 dark-bg-dark-400 rounded-2xl mx-auto shadow-2xl overflow-y-scroll overscroll-contain relative max-h-88vh max-w-98vw;
  overscroll-behavior-y: none;
}
</style>