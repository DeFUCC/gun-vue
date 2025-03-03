<script setup>

import { safeHash, selectedUser } from '#composables'
import { UiLayer, AccountHome } from '#components'

import { ref, onMounted } from 'vue'
const props = defineProps({
  pub: { type: String, default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk' }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})

</script>

<template lang="pug">
.p-0.flex.flex-col
  account-home(
  :key="pub" 
  :pub="pub" 
  @user="selectedUser.pub = $event"
  @post="$router.push(`/posts/${safeHash($event)}`)"
  @chat="$router.push(`/messages/${pub}`)" 
  @project="$router.push(`/projects/${$event}`)"
  )
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      component(:is="Component" )

</template>