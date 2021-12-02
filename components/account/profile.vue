<script setup>
import { useAccount, color } from '@gun-vue/composables'
import pulseDot from '../pulse/dot.vue'
const account = useAccount()
</script>

<template lang='pug'>
.flex.flex-col
  .p-4.flex(
    v-if="account.is"
    :style="{ backgroundColor: color.deep.hex(account.pub) }"
    ) 
    pulse-dot(:blink="account.blink")
    .ml-2.text-xs {{ account.pub }}
  .text-xs.p-4 Profile: {{ account.profile }}
  .flex.flex-wrap
    button.button(@click="account.auth()" v-if="!account.is") Auth
    button.button(@click="account.logout()" v-else) Logout
</template>