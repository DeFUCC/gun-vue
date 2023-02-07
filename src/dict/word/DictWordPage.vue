<script setup>
import { useWord, useColor, letterFilter, dictRecord, useDictRecordsFor } from '#composables';

const props = defineProps({
  hash: { type: String, default: '' }
})

defineEmits(['def', 'close'])

const color = useColor('light')

const { word } = useWord(props.hash)
const links = useDictRecordsFor(props.hash)

</script>

<template lang="pug">
.flex.flex-col.p-4.rounded-xl(:style="{ backgroundColor: color.hex(hash) }" )
  .flex.items-center.rounded-lg.capitalize.mb-4
    .text-2xl.font-bold {{ letterFilter(word) }}

    .i-la-link.link(
      :class="{ active: dictRecord.word == hash || links[dictRecord.def] }"
      @click.stop.prevent="dictRecord.word = dictRecord.word == hash ? null : hash"
      )
    .flex-1
    button.cursor-pointer.p-2(@click="$emit('close')")
      .i-la-times.text-xl
  .flex.flex-wrap.gap-2
    .p-0(
      v-for="(authors, h) in links" 
      :key="h"
      )
      template(v-if="Object.keys(authors).length > 0") 
        dict-def-card.cursor-pointer(
          :hash="h" 
          @click="$emit('def', h)"
          )
          //- dict-link-list(:links="{ [h]: authors }" :avatar="true")

</template>

<style lang="postcss" scoped>
.link {
  @apply transition ml-2 p-1 bg-light-100 rounded-xl text-xl cursor-pointer;
}

.link.active {
  @apply bg-dark-50 text-light-200;
}
</style>