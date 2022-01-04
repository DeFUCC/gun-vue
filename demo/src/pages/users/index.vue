<script setup>
import { gun, useAccount } from '@composables';

const guests = reactive({})

gun.get('public').get('#guests').map().on((d, k) => {
  guests[k] = useAccount(ref(d))
})
</script>

<template lang='pug'>
.flex.flex-col
  .p-2 Users index
  .flex.flex-wrap
    router-link.p-1(
      v-for="guest in guests" :key="guest"
      :to="`/users/${guest.account.pub}`"
      :style="{ opacity: guest.account.pulse && Date.now() - guest.account.pulse < 30000 ? 1 : 0.5 }"
      ) 
      account-badge(:pub="guest.account.pub")
</template>