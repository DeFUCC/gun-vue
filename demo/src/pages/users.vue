<script setup>
import { gun, useAccount } from '@composables';
import { reactive, ref } from 'vue'
const guests = reactive({})

gun.get('public').get('#guests').map().on((d, k) => {
  guests[k] = useAccount(ref(d))
})
</script>

<template lang='pug'>
.flex.flex-col
  router-link.px-8.py-2.bg-light-900.font-bold(to="/users/") Users
  .flex.flex-wrap
    router-link.p-1(
      v-for="guest in guests" :key="guest"
      :to="`/users/${guest.account.pub}`"
      :style="{ opacity: guest.account.pulse && Date.now() - guest.account.pulse < 30000 ? 1 : 0.5 }"
      ) 
      account-badge(:pub="guest.account.pub")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 