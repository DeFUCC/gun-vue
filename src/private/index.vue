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
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" style="flex: 6" )
</template>
