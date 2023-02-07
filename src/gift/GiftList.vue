<script setup>
import { useGifts } from '#composables'

const { gifts } = useGifts()

const emit = defineEmits(['open', 'project'])

</script>

<template lang="pug">
.flex.flex-col.gap-2
  .text-lg.font-bold.w-full ALL
  gift-card.cursor-pointer(
    v-for="(gift, hash) in gifts" 
    :key="hash"
    :hash="hash"
    @click="$emit('open', hash)"
    @project="$emit('project', $event)"
    )    
</template>