<script setup>import { gun } from '@composables';

const guests = reactive({})

gun.get('public').get('#guests').map().on((d, k) => {
  guests[k] = d
})
</script>

<template lang='pug'>
.flex.flex-col
  .p-2 Users index
  .flex.flex-wrap
    router-link.p-1(
      v-for="guest in guests" :key="guest"
      :to="`/users/${guest}`"
      )
      account-avatar(:pub="guest" :size="54")
</template>