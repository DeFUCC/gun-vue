<script setup>
import { useDateTree } from '@composables'
const props = defineProps({
  root: { type: String, default: 'log' },
  from: { type: String, default: "2021-01-01" },
  to: { type: String, default: "2023-01-01" },
})
const { dateTree, putNow } = useDateTree(props);
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
    button.button(@click="message && putNow(message); message = ''") Update
</template>