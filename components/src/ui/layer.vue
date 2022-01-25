<script setup>
const props = defineProps({
  open: { default: false },
  offset: { default: '' },
  closeButton: { type: Boolean, default: true },
  back: { type: Boolean, default: true }
})
const emit = defineEmits(['close'])
</script>

<template lang="pug">
transition(name="fade")
  .fixed.w-full.h-full.top-0.left-0.z-500.flex.flex-col.items-center(v-show="open")
    transition-group(name="fade")
      .bg-dark-200.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer.backdrop-filter.backdrop-blur-sm(key="bg" @click="$emit('close')" v-if="open && back")
      .layer(:style="{ top: offset || '10vh' }" v-if="open" key="layer")
        button.button.fixed.right-4.top-4( v-if="closeButton" @click="$emit('close')")
          la-times
        slot
</template>

<style lang="postcss" scoped>
.layer {
  @apply bg-light-100 rounded-3xl z-200 shadow-2xl overflow-y-scroll overscroll-contain max-h-88vh left-0 mx-2 right-0 relative z-500;
  overscroll-behavior-y: none;
}
</style>