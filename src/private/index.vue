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
.flex
  chat-private-list(
    style="flex: 1 0 200px"
    @chat="$router.push(`/private/${$event}`)"
    :current="pub"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" style="flex: 6" )
</template>
