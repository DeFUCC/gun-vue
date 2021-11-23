<script setup>
const links = {
  '/': 'Home',
  '/players': 'Players'
}
</script>

<template lang="pug">
.flex.flex-wrap.items-center
  router-link.p-2(v-for="(link,l) in links" :key="link" :to="l") {{ link }}

</template>

