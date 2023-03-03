<script setup>

</script>

<template lang='pug'>
.flex
  chat-private-list(@chat="$router.push(`/my/chat/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" )
</template>

<route lang="yaml">
name: My chat
meta:
  requiresAuth: true
</route>