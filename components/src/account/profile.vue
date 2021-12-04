<script setup>
import { useAccount, color } from '@composables'
import pulseDot from '../util/pulse.vue'
const account = useAccount()
</script>

<template lang='pug'>
.flex.flex-col
  .p-4.flex.items-center(
    v-if="account.is"
    :style="{ backgroundColor: color.deep.hex(account.pub) }"
    ) 
    pulse-dot(:blink="account.blink")
    .mx-2.text-xs.break-all {{ account.pub }}
    .flex-1
    button.text-sm.p-1.bg-light-300.shadow.rounded-lg(@click="account.logout()") Logout
  .flex.flex-col 
    .p-2.flex(v-for="(d,k) in account.profile" :key="d")
      .mr-2.font-bold {{ k }}
      .text-md {{ d }}
</template>