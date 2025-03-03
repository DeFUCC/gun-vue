<script setup>
import { useUser } from '#composables';
import AuthLogin from '../auth/AuthLogin.vue';
import MessageList from './MessageList.vue';


const props = defineProps({
  pub: {
    default: '',
    type: String
  }
})

const { user } = useUser()


</script>

<template lang='pug'>
.flex.relative.items-stretch.bg-dark-50.dark-bg-dark-200.bg-opacity-40
  MessageList(
    @chat="$router.push(`/messages/${$event}`)"
    )
    AuthLogin(v-if="!user.is")
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in" appear)
      keep-alive
        component(:is="Component" style="flex: 6" @back="")
</template>
