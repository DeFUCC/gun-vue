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

chat-private.h-80vh(:pub="pub" :key="pub" @user="$router.push(`/users/${pub}`)")

</template>