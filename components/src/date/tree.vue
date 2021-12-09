<script setup>
import { useDataTree } from '@composables'

const { dateTree, putNow } = useDataTree();

console.log(dateTree, putNow)

</script>

<template lang='pug'>
.flex.flex-col 
  .p-4.card
    button.shadow.rounded.bg-light-300(@click="putNow(Date.now())") Add 
    p {{ dateTree }}
</template>