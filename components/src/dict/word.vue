<script setup>
import { useWord, useColor, renderWord } from '@composables';

const props = defineProps({
  hash: String
})

const color = useColor('light')

const { word } = useWord(props.hash)

</script>

<template lang='pug'>
.flex.flex-col.gap-2.p-4
  .rounded-xl.text-xl.p-2(:style="{ backgroundColor: color.hex(hash) }" v-html="renderWord(word)") 
</template>