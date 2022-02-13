<script setup>
import { computed } from 'vue'
import { selectedUser } from '..';

const props = defineProps({
  author: String,
  timestamp: [String, Array],
  text: String
})

const dateTime = computed(() => {
  return formatDate(Number(props.timestamp))
})

function formatDate(timestamp) {
  if (!timestamp) return
  const theDate = new Date(timestamp)
  const date = theDate.toLocaleDateString('en-CA')
  const time = theDate.toLocaleTimeString('ru-RU')
  return {
    full: date + ' ' + time,
    date,
    time,
    // ms: ms(Date.now() - theDate.getTime()),
  }
}
</script>

<template lang='pug'>
.p-1.flex.flex-col.w-full.gap-1
  .flex.items-center
    account-badge.opacity-50.hover_opacity-90.transition(:pub="author" :showName="true" :size="20" @click="selectedUser.pub = author")
    .flex-1
    .text-sm.opacity-20.hover_opacity-80.transition.cursor-default.text-light-200 {{ dateTime.date }}
  .px-2.py-1.bg-light-300.bg-opacity-80.rounded-r-xl.rounded-b-xl.max-w-max.break-all.overflow-hidden
    slot {{ text }}
</template>