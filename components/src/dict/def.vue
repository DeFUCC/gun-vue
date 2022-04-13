<script setup>
import { ref } from 'vue'
import { useGun, useColor, renderWord } from '@composables';

const props = defineProps({
  hash: String
})

const colorDeep = useColor('deep')

const gun = useGun()

const def = ref()

gun.get('#def').get(props.hash).once((d, k) => {
  def.value = JSON.parse(d)
})
</script>

<template lang='pug'>
.flex.flex-col.gap-2.p-4
  .rounded-xl.text-xl.p-2(:style="{ borderColor: colorDeep.hex(hash) }") 
    .text-sm {{ def.part }}
    .text-lg {{ def.text }}
</template>