<script setup>
import { useDataTree } from '@composables'

const { dateTree, putNow } = useDataTree();
</script>

<template lang='pug'>
.flex.flex-col 
  .p-4.card
    button.shadow.rounded.bg-light-300(@click="putNow(Date.now())") Add 
    p {{ dateTree }}
</template>