<script setup>
import { useWord, useColor, letterFilter, dictLink, useLinks } from '@composables';

const props = defineProps({
  hash: String
})

const color = useColor('light')

const { word } = useWord(props.hash)
const links = useLinks(props.hash)

</script>

<template lang='pug'>
.flex.items-center.px-2.py-1.rounded-lg.bg-light-700.cursor-pointer.capitalize(:style="{ backgroundColor: color.hex(hash) }" )
  .text-xl {{ letterFilter(word) }}
  dict-links(:links="links")
  la-link.link(
    @click.stop.prevent="dictLink.word = dictLink.word == hash ? null : hash"
    :class="{ active: dictLink.word == hash || links[dictLink.def] }"
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