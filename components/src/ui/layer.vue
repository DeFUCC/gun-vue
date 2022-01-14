<script setup>
const props = defineProps({
  open: { default: false }
})
const emit = defineEmits(['close'])
</script>

<template lang="pug">

.fixed.w-full.h-full.top-0.left-0.flex.justify-end.items-stretch.z-500(v-show="open")
  transition(name="fade")
    .bg-dark-200.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer(@click="$emit('close')" v-if="open")
      button.button.absolute.right-0.top-1vh(@click="$emit('close')")
        la-times
  transition(name="slide" mode="out-in")
    .top-9vh.bg-light-100.rounded-3xl.flex.flex-col.z-200.relative.shadow-2xl.overflow-hidden.bottom-0.overflow-y-scroll.max-h-89vh.min-w-80.max-w-140.mx-2.right-0.overscroll-contain.relative.z-500(v-if="open")
      slot
</template>