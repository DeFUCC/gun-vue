<script setup>

</script>

<template lang="pug">
chat-private-list(
  style="flex: 1 0 200px"
  @chat="$router.push(`/private/${$event}`)"
  )
</template>
