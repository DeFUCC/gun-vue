<script setup>
const props = defineProps({
  space: { type: String, default: 'public' }
})
</script>

<template lang='pug'>
.p-2.h-full(:key="space")
  space-plane.rounded-xl.overflow-hidden.shadow-xl.bg-light-100(@user="$router.push('/users/' + $event)" :name="space")
</template>