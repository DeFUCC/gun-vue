<script setup>

import { safeHash } from '@composables'


import { ref, onMounted } from 'vue'
const props = defineProps({
  pub: { type: String, default: '' }
})

const open = ref(false)

onMounted(() => {
  open.value = true
})

</script>

<template lang='pug'>
.p-0
  ui-layer(:open="open" :closeButton="false"  @close="$router.push('/users/')")
    account-home(
    :pub="pub" 
    @browse="$router.push(`/users/${$event}`)" 
    :key="pub"
    @post="$router.push(`/posts/${safeHash($event)}`)"
    @chat="$router.push(`/my/chat/${pub}`)" 
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )

</template>