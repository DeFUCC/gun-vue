<script setup>
import { dictRecord, useColor, selectedUser } from '@composables';

const color = useColor('light')
const colorDeep = useColor('deep')

const props = defineProps({
  links: [Array, Object],
  type: { type: String, default: 'def' },
  avatar: Boolean
})

const emit = defineEmits(['def', 'word'])
</script>

<template lang='pug'>
.flex.flex-wrap.gap-1.m-1
  .p-2.rounded-xl.flex.gap-1.flex-wrap(
    @click.stop.prevent="$emit(type, link)"
    v-for="(authors, link) in links" :key="link"
    :style="{ backgroundColor: color.hex(link) }"
    )
      .p-1.rounded-full(:style="{ backgroundColor: colorDeep.hex(author) }" v-for="(is, author) in authors" :key="author") 
        account-avatar(:pub="author" v-if="avatar" :size="20" @click="selectedUser.pub = author")
</template>