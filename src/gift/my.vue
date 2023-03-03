<script setup>
import { useMyGifts } from '#composables';


const { gifts, to, from, newGifts } = useMyGifts()
</script>

<template lang="pug">
.flex.flex-col
  .text-lg My Gifts
  template(v-if="Object.keys(newGifts).length > 0")
    .text-lg.my-6.font-bold New
    .flex.flex-col.gap-2
      gift-card(
        v-for="(gift, hash) in newGifts" 
        :key="hash"
        :hash="hash"
        )

  .text-lg.my-6.font-bold Sent
  .flex.flex-col.gap-2

    gift-card(
      v-for="(gift, hash) in from" 
      :key="hash"
      :hash="hash"
      )
  .text-lg.my-6.font-bold Received
  .flex.flex-col.gap-2

    gift-card(
      v-for="(gift, hash) in to" 
      :key="hash"
      :hash="hash"
      )
</template>