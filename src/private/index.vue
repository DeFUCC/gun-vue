<script setup>

</script>

<template lang='pug'>
.flex
  chat-private-list(@chat="$router.push(`/private/${$event}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive
        component(:is="Component" )
</template>
