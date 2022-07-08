<script setup>

</script>

<template lang='pug'>
button.button.flex.items-center.m-1
  slot(name="icon")
    la-plus
  slot
</template>