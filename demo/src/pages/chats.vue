<script setup>

</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative
  chat-private-list(@chat="$router.push(`/my/chat/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>