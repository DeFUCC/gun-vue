<script setup>

import { isEmoji } from '@composables';
const props = defineProps({
  reactions: Object,
  current: String
})

const emit = defineEmits(['update:current'])
</script>

<template lang='pug'>
.p-2.flex.flex-wrap.bg-light-800.shadow-md.rounded-xl.gap-2
  transition-group(name="fade")
    .flex.py-2.items-center.cursor-pointer.bg-light-100.rounded-xl.shadow-lg.px-4(
      style="flex: 1 1 10px"
      :style="{ backgroundColor: current == reaction ? '#999' : '' }"
      v-for="(hashes, reaction) in reactions" :key="reaction"
      @click="emit('update:current', reaction)"
      )
      .text-4xl {{ isEmoji(reaction) ? reaction : '👋' }}
      .flex-1.w-4
      la-angle-up(v-if="current == reaction")
      la-angle-down(v-else)
      .text-lg.ml-1 {{ Object.keys(hashes).length }}
</template>