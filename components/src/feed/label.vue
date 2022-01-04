<script setup>
const props = defineProps({
  hash: { type: String, default: '0' },
  tag: { type: String, default: 'tag' },
  showEmpty: { type: Boolean, default: false }
})
import { color, useFeed } from '@composables';
const { count } = useFeed(toRef(props, 'tag'))

</script>

<template lang='pug'>
div(class="flex items-center hover:(filter brightness-110) transition-all duration-100 ease" v-show="count > 0 || showEmpty" :style="{ backgroundColor: color.light.hex(hash) }") 
  .m-0 {{ tag }} 
  .flex-1
  .font-bold.bg-light-200.rounded-full.px-1.py-1px.ml-2.text-xs.text-white( :style="{ backgroundColor: color.deep.hex(hash) }") {{ count }}
  slot
</template>