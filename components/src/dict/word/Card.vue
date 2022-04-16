<script setup>
import { useWord, useColor, letterFilter, dictRecord, useDictRecords, useUser } from '@composables';

const props = defineProps({
  hash: String
})

defineEmits(['def'])

const { user } = useUser()

const color = useColor('light')

const { word } = useWord(props.hash)
const links = useDictRecords(props.hash)

</script>

<template lang='pug'>
.flex.items-center.px-2.py-1.rounded-lg.bg-light-700.cursor-pointer.capitalize(:style="{ backgroundColor: color.hex(hash) }" )
  .text-xl {{ letterFilter(word) }}
  slot
  dict-links(:links="links" @def="$emit('def', $event)")
  la-link.link(
    v-if="user.is"
    @click.stop.prevent="dictRecord.word = dictRecord.word == hash ? null : hash"
    :class="{ active: dictRecord.word == hash || links?.[dictRecord.def]?.[user.pub] }"
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