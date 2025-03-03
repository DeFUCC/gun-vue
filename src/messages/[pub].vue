<script setup>
import { ref, onMounted } from 'vue'
import { MessageExchange } from '../components'
import { useMediaQuery } from '@vueuse/core'

const emit = defineEmits(['back'])

const props = defineProps({
  pub: { type: String, default: "OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk" }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})

const isLarge = useMediaQuery('(min-width: 640px)')
</script>

<template lang="pug">
MessageExchange(
  :pub="pub" 
  @back="$emit('back')"
  :back="!isLarge"
  )
</template>
