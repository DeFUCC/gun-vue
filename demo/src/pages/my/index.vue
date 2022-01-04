<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  user-home(@browse="$router.push(`/users/${$event}`)")
</template>