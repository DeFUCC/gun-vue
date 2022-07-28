<script setup>
import { useMyGifts } from '#composables';


const { gifts, to, from } = useMyGifts()
</script>

<template lang='pug'>
.flex.flex-col
  .text-lg My Gifts
  .flex.flex-col
    .text-lg.font-bold My accounts and wallets 

  .flex.gap-2
    .flex.flex-col
      .text-lg Sent
      gift-card(
        v-for="(gift, hash) in from" 
        :key="hash"
        :hash="hash"
        )
    .flex.flex-col
      .text-lg Received
      gift-card(
        v-for="(gift, hash) in to" 
        :key="hash"
        :hash="hash"
        )
</template>