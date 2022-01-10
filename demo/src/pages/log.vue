<script setup>

</script>

<template lang='pug'>
.flex.flex-col
  log-tree(@browse="$router.push($event)")
</template>