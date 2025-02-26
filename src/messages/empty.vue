<script setup>
import { useUser } from '#composables';
import MessageList from './MessageList.vue';

const { user } = useUser()
</script>

<template lang="pug">
MessageList.p-4(
  style="flex: 1 0 200px"
  @chat="$router.push(`/messages/${$event}`)"
  )
    auth-login(v-if="!user.is")
</template>
