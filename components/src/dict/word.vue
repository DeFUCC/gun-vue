<script setup>
import { useWord, useColor, renderWord } from '@composables';

const props = defineProps({
  hash: String
})

const colorDeep = useColor('deep')

const { word } = useWord(props.hash)

</script>

<template lang='pug'>
.flex.flex-col.gap-2.p-4
  .border-4.rounded-xl.text-xl.p-2(:style="{ borderColor: colorDeep.hex(hash) }" v-html="renderWord(word)") 
</template>