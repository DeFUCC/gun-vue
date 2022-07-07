<script setup>
import { useGifts } from '@composables'

const { gifts, del } = useGifts()

console.log(gifts)
</script>

<template lang='pug'>
.flex.flex-col.gap-2
  .p-2.rounded-bg-light-200.bg-opacity-40(
    v-for="(gift, hash) in gifts" :key="hash"
    ) {{ gift }}
    button(@click="del(hash)") del
</template>