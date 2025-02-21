<script setup>
import { useUser } from '#composables';

const { user } = useUser()
</script>

<template lang="pug">
chat-private-list.p-4(
  style="flex: 1 0 200px"
  @chat="$router.push(`/private/${$event}`)"
  )
    auth-login(v-if="!user.is")
</template>
