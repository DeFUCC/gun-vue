<script setup>
import { useWord, useColor, letterFilter, dictRecord, useDictRecordsFor } from '@composables';

const props = defineProps({
  hash: String
})

defineEmits(['def', 'close'])

const color = useColor('light')
const colorDeep = useColor('deep')

const { word } = useWord(props.hash)
const links = useDictRecordsFor(props.hash)

</script>

<template lang='pug'>
.flex.flex-col.p-4.rounded-xl(:style="{ backgroundColor: color.hex(hash) }" )
  .flex.items-center.rounded-lg.capitalize.mb-4
    .text-2xl.font-bold {{ letterFilter(word) }}

    la-link.link(
      @click.stop.prevent="dictRecord.word = dictRecord.word == hash ? null : hash"
      :class="{ active: dictRecord.word == hash || links[dictRecord.def] }"
      )
    .flex-1
    button.cursor-pointer.p-2(@click="$emit('close')")
      la-times.text-xl
  .flex.flex-wrap.gap-2
    .p-0(v-for="(authors, h) in links" :key="h")
      template(v-if="Object.keys(authors).length > 0") 
        dict-def-card.cursor-pointer(:hash="h" @click="$emit('def', h)")
          //- dict-link-list(:links="{ [h]: authors }" :avatar="true")

</template>

<style lang="postcss" scoped>
.link {
  @apply transition ml-2 p-1 bg-light-100 rounded-xl text-xl cursor-pointer;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>