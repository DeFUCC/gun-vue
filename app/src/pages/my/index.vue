<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  user-home(
    @room="$router.push(`/rooms/${$event}`)" 
    @user="$router.push(`/users/${$event}`)" 
    @chat="$router.push(`/my/chat/${$event}`)"
    @post="$router.push(`/users/${$event}`)"
  )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>