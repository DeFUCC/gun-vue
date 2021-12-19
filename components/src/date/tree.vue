<script setup>
import { useDataTree } from '@composables'

const { dateTree, putNow } = useDataTree();
const message = ref()
</script>

<template lang='pug'>
.flex.flex-col.m-2.p-4.rounded-2xl.shadow-lg
  .flex.flex-col
    .p-2.flex.items-center(v-for="(data,date) in dateTree" :key="date")
      .mx-1.text-sm.whitespace-nowrap {{ date }}
      .mx-1 {{ data.data }}
  form.p-4.flex.flex-wrap(action="javascript:void(0)")
    input.p-4.rounded-xl.mr-4(v-model="message")
    button.button(@click="putNow(message)") Say it today 
</template>