<script setup>
import { ref, onMounted, toRef } from 'vue'
import { MessageExchange, UiLayer } from '../../components'

const props = defineProps({
  pub: { type: String, default: '' }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})


</script>

<template lang="pug">
ui-layer(
  :open="open" 
  :close-button="false"  
  @close="$router.push(`/users/${pub}`)")
  MessageExchange.w-90vw.h-80vh(:pub="pub")

</template>