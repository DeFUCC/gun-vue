<script setup>
import { useWord, useColor, letterFilter, dictRecord, useDictRecordsFor, useUser } from '@composables';

const props = defineProps({
  hash: String
})

defineEmits(['def'])

const { user } = useUser()

const color = useColor('light')

const { word } = useWord(props.hash)
const links = useDictRecordsFor(props.hash)

</script>

<template lang='pug'>
.flex.items-center.px-2.py-1.rounded-lg.bg-light-700.cursor-pointer.capitalize(:style="{ backgroundColor: color.hex(hash) }" )
  .text-xl {{ letterFilter(word) }}
  slot
  dict-link-list(:links="links" @def="$emit('def', $event)")
  dict-link-button(
    :hash="hash"
    type="word"
    :my="links?.[dictRecord.def]?.[user.pub]"
    )
</template>

<style lang="postcss" scoped>
.link {
  @apply transition ml-2 p-1 bg-light-100 rounded-xl text-xl cursor-pointer;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>