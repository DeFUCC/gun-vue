<script setup>

import { safeHash } from '#composables'


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
.p-0
  ui-layer(:open="open" :closeButton="false"  @close="$router.push('/users/')")
    account-home(
    :pub="pub" 
    @browse="$router.push(`/users/${$event}`)" 
    :key="pub"
    @post="$router.push(`/posts/${safeHash($event)}`)"
    @chat="$router.push(`/my/chat/${pub}`)" 
    @project="$router.push(`/projects/${$event}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )

</template>