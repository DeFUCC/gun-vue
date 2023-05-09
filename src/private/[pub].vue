<script setup>
import { ref, onMounted } from 'vue'
import { ChatPrivate } from '../components'


const props = defineProps({
  pub: { type: String, default: "OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk" }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})
</script>

<template lang="pug">
chat-private.h-80vh(
  :pub="pub" 
  @user="$router.push(`/users/${pub}`)"
  )
</template>

