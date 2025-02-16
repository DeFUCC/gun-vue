<script setup>
import { ChatPrivateList } from '../components'

const props = defineProps({
  pub: {
    default: '',
    type: String
  }
})


</script>

<template lang='pug'>
.flex.flex-col.h-full
  router-link.p-4.sticky.top-16.bg-light-800.dark-bg-dark-700.z-4000.backdrop-blur.dark-bg-op-50(to="/private") Private messages
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" style="flex: 6" )
</template>
