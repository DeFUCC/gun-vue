<script setup>
import { useGifts } from '@composables'

const { gifts } = useGifts()

</script>

<template lang='pug'>
.flex.flex-col.gap-2

  .flex.flex-col.gap-2
    .text-lg.font-bold Gifts
    gift-card(
      v-for="(gift, hash) in gifts" :key="hash"
      :gift="gift"
      :hash="hash"
      )
    
</template>