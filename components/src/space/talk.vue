<script setup>
import { usePublicHashList } from '@composables'

const { list, addToList } = usePublicHashList()
</script>

<template lang='pug'>
.flex.flex-col
  .p-4.rounded-xl.m-4.shadow-md.flex(
    v-for="(item,hash) in list" :key="hash"
  )
    .m-1.text-sm {{ item }}
    .m-1.text-xs {{ hash }}
  button.button(@click="addToList({ world: 'hello @ ' + Date.now() })") Add
</template>