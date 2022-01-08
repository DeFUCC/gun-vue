<script setup>
const props = defineProps({
  open: { default: false }
})
const emit = defineEmits(['close'])
</script>

<template lang='pug'>
transition(name="fade")
  .fixed.w-full.h-full.flex.items-center.justify-center.top-0.left-0(v-if="open")
    .bg-dark-100.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer(@click="$emit('close')")
    .bg-light-100.rounded-3xl.flex.flex-col.z-4.text-center.relative.shadow-2xl.overflow-hidden.p-6.bottom-0.top-10.overflow-y-scroll.max-h-60vh.min-w-80.max-w-120
      button.button.absolute.right-0.top-0(@click="$emit('close')")
        la-times
      slot
</template>