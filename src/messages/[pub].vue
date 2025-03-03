<script setup>
import { ref, onMounted } from 'vue'
import { MessageExchange } from '../components'


const props = defineProps({
  pub: { type: String, default: "OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk" }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})
</script>

<template lang="pug">
MessageExchange(
  :pub="pub" 
  @back="$router.push('/messages/')"
  )
</template>
