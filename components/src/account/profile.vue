<script setup>
import { useAccount, color } from '@composables'
const { account, leave } = useAccount()
</script>

<template lang='pug'>
.flex.flex-col
  .p-4.flex.items-center(
    v-if="account.is"
    :style="{ backgroundColor: color.deep.hex(account.pub) }"
    ) 
    util-pulse(:blink="account.blink")
    account-avatar.mx-2
    .flex-1
    button.text-xl.ml-2.p-1.bg-light-300.shadow.rounded-lg(@click="leave()")
      ion-exit-outline
  .flex.flex-col 
    .p-2.flex(v-for="(d,k) in account.profile" :key="d")
      .mr-2.font-bold {{ k }}
      .text-md {{ d }}
</template>