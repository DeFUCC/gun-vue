<script setup>
import { useGifts } from '#composables'

const { gifts } = useGifts()

const emit = defineEmits(['open'])

</script>

<template lang='pug'>
.flex.flex-col.gap-2
  .text-lg.font-bold.w-full ALL
  gift-card.cursor-pointer(
    @click="$emit('open', hash)"
    v-for="(gift, hash) in gifts" :key="hash"
    :hash="hash"
    )

    
</template>