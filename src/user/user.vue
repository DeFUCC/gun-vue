<script setup>

</script>

<template lang='pug'>
UserHome(
  @chat="$router.push(`/private/${$event}`)"
  @room="$router.push(`/rooms/${$event}`)"
  )
</template>