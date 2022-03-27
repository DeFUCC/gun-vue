<script setup>
import { ref, onMounted, toRef } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})


</script>

<template lang='pug'>
ui-layer(:open="open" :closeButton="false"  @close="$router.push(`/chats/`)")
  chat-private.w-90vw.h-80vh(:pub="pub")

</template>