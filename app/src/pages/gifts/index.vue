<script setup>
import { useGifts } from '@composables'

const { gifts, my, proposed } = useGifts()

</script>

<template lang='pug'>
.flex.flex-wrap.gap-2
  .flex.flex-col.gap-2
    .text-lg.font-bold MY
    gift-card(
      v-for="(gift, hash) in my" :key="hash"
      :gift="gift"
      :hash="hash"
      )
  .flex.flex-col.gap-2
    .text-lg.font-bold COMPLETE
    gift-card(
      v-for="(gift, hash) in gifts" :key="hash"
      :gift="gift"
      :hash="hash"
      )
    
</template>