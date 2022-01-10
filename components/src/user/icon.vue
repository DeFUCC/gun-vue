<script setup>
import { useUser } from '@composables';
import { ref } from 'vue'

useUser()
const open = ref(false)

</script>

<template lang='pug'>
.mx-2.text-xl.cursor-pointer(@click="open = true")
  account-avatar(:size="42" :border="2")
transition(name="fade")
  .fixed.w-full.h-full.flex.items-center.justify-center.z-10.top-0.left-0.right-0(v-show="open")
    .bg-dark-100.bg-opacity-30.w-full.h-full.absolute.z-2.cursor-pointer(@click="open = false")
    .bg-light-100.w-120.rounded-3xl.flex.flex-col.items-center.z-4.text-center.break-all.relative.shadow-2xl.overflow-hidden
      user-home
</template>