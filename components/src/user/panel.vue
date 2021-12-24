<script setup>
import { useAccount, color } from '@composables'
const { account, leave } = useAccount()
</script>

<template lang='pug'>
.p-4.flex.items-center(
  v-if="account.is"
  :style="{ backgroundColor: color.deep.hex(account.pub) }"
  ) 
  account-avatar
  .text-2xl.mx-2.font-bold {{ account.profile?.name }}
  .flex-1 
  util-pulse(:blink="account.blink")
  button.p-2.text-2xl(@click="account.user.get('safe').get('saved').put(!account.safe.saved)")
    la-lock(v-if="account.safe.saved")
    la-unlock(v-else)
  button.text-2xl.ml-1.p-2(@click="leave()")
    ion-exit-outline
</template>