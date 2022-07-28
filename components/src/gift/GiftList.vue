<script setup>
import { useGifts } from '#composables'

const { gifts, my, proposed } = useGifts()

const emit = defineEmits(['open'])

</script>

<template lang='pug'>
.flex.flex-wrap.gap-2
  .flex.flex-col.gap-2
    .text-lg.font-bold MY
    gift-card(
      @click="$emit('open', hash)"
      v-for="(gift, hash) in my" :key="hash"
      :hash="hash"
      )
  .flex.flex-col.gap-2
    .text-lg.font-bold COMPLETE
    gift-card(
      @click="$emit('open', hash)"
      v-for="(gift, hash) in gifts" :key="hash"
      :hash="hash"
      )
    
</template>