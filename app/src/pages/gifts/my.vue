<script setup>
import { useMyGifts } from '#composables';


const { gifts, to, from } = useMyGifts()
</script>

<template lang='pug'>
.flex.flex-col
  .text-lg My Gifts
  .text-lg.my-6.font-bold Sent
  .flex.flex-wrap.gap-2

    gift-card(
      v-for="(gift, hash) in from" 
      :key="hash"
      :hash="hash"
      )
  .text-lg.my-6.font-bold Received
  .flex.flex-wrap.gap-2

    gift-card(
      v-for="(gift, hash) in to" 
      :key="hash"
      :hash="hash"
      )
</template>