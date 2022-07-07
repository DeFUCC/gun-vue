<script setup>

</script>

<template lang='pug'>
.p-2.flex.flex-col.gap-2
  .text-xl.p-4.bg-gray-300 GIFTS
  router-link.button(to="/gifts/add") ADD GIFT
  router-view
</template>