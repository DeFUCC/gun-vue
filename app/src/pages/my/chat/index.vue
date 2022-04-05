<script setup>

</script>

<template lang='pug'>
.flex.flex-col.flex-auto.relative.z-300
  chat-private-list(@chat="$router.push(`/my/chat/${$event}`)")
</template>