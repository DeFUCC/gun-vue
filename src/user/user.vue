<script setup>

</script>

<template lang='pug'>
UserHome(
  @chat="$router.push(`/messages/${$event}`)"
  @room="$router.push(`/rooms/${$event}`)"
  )
</template>