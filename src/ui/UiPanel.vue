<script setup>
const props = defineProps({
  open: { type: Boolean, default: false },
  offset: { type: String, default: '' },
  closeButton: { type: Boolean, default: true },
  back: { type: Boolean, default: true }
})
const emit = defineEmits(['close'])
</script>

<template lang="pug">
transition(name="fade" mode="out-in" appear)
  .fixed.w-full.h-full.top-0.left-0.z-500.flex.flex-col.items-end(v-show="open")
    transition-group(name="slide")
      .bg-dark-200.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer.backdrop-filter.backdrop-blur-sm(
        v-if="open && back" 
        key="bg" 
        @click="$emit('close')"
        )
      .layer.mr-2(
        v-if="open" 
        key="layer" 
        :style="{ top: offset || '8vh' }"
        )
        button.button.fixed.right-4.top-4( 
          v-if="closeButton" 
          @click="$emit('close')"
          )
          .i-la-times
        slot
</template>

<style lang="postcss" scoped>
.layer {
  @apply bg-light-100 dark-bg-dark-400 rounded-3xl z-200 shadow-2xl overflow-y-scroll overscroll-contain max-h-88vh max-w-98vw relative z-500;
  overscroll-behavior-y: none;
}
</style>