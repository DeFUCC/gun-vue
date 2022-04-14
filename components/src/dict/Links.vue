<script setup>
import { dictLink, useColor } from '@composables';

const color = useColor('light')

const props = defineProps({
  links: [Array, Object],
  type: { type: String, default: 'def' }
})
</script>

<template lang='pug'>
.flex.flex-wrap.gap-1.m-1
  .p-2.rounded-xl(
    @click.stop.prevent="dictLink[type] = link"
    v-for="(authors, link) in links" :key="link"
    :style="{ backgroundColor: color.hex(link) }"
    )
      account-avatar(v-for="(is, author) in authors" :key="author" :size="18" :pub="author") 
</template>