<script setup>
import { ref } from 'vue'
import { useGun, useColor, renderWord } from '@composables';

const props = defineProps({
  hash: String
})

const colorDeep = useColor('deep')

const gun = useGun()

const word = ref()

gun.get('#word').get(props.hash).once((d, k) => {
  word.value = JSON.parse(d)
})
</script>

<template lang='pug'>
.flex.flex-col.gap-2.p-4
  .border-4.rounded-xl.text-xl.p-2(:style="{ borderColor: colorDeep.hex(hash) }" v-html="renderWord(word)") 
</template>