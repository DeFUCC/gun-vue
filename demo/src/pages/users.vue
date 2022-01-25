<script setup>
import { gun, useAccount } from '@composables';
import { reactive, ref } from 'vue'
const guests = reactive({})

gun.get('public').get('#guests').map().on((d, k) => {
  guests[k] = useAccount(ref(d))
})

const TIMEOUT = 10000

let time = Date.now()

function getOrder(pulse) {
  let age = time - pulse
  if (age < TIMEOUT) {
    return 1
  } else {
    return age
  }
}
</script>

<template lang='pug'>
.flex.flex-col
  router-link.px-4.py-4.bg-light-900.font-bold(to="/users/") Public space users
  .flex.flex-wrap
    transition-group(name="fade")
      router-link.p-1(
        v-for="(guest, p) in guests" :key="p"
        :to="`/users/${guest.account.pub}`"
        :style="{ opacity: guest.account.pulse && time - guest.account.pulse < 30000 ? 1 : 0.5, order: getOrder(guest.account.pulse) }"
        ) 
        account-badge.shadow-md(:pub="guest.account.pub")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 