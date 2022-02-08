<script setup>
import { useColor, usePosts } from '@composables';

const props = defineProps({
  hash: { type: String, default: '0' },
  tag: { type: String, default: 'tag' },
  showEmpty: { type: Boolean, default: false }
})

const { count } = usePosts(props.tag)

const colorDeep = useColor('deep')
const colorLight = useColor('light')

</script>

<template lang='pug'>
div(class="flex items-center hover:(filter brightness-110) transition-all duration-100 ease" v-show="count > 0 || showEmpty" :style="{ backgroundColor: colorLight.hex(hash) }") 
  .m-0.text-md.font-bold.capitalize {{ tag }} 
  .flex-1
  .font-bold.bg-light-200.rounded-full.px-1.py-1px.ml-2.text-sm.text-white( :style="{ backgroundColor: colorDeep.hex(hash) }") {{ count }}
  slot
</template>