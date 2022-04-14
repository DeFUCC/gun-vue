<script setup>
import { ref } from 'vue'
import { useGun, useColor, useLinks, dictLink, langParts } from '@composables';

const props = defineProps({
  hash: String
})

const color = useColor('light')

const gun = useGun()

const def = ref()

gun.get('dict').get('#def').get(props.hash).once((d, k) => {
  def.value = JSON.parse(d)
})

const links = useLinks(props.hash)
</script>

<template lang='pug'>
.flex.flex-col.rounded-xl.text-xl.p-2(
  :style="{ backgroundColor: color.hex(hash) }"
  ) 
  .text-lg(
    style="text-decoration-line: underline"
    :style="{ textDecorationStyle: langParts[def?.part]?.underline, textDecorationColor: color.hex(hash) }"
) {{ def?.text }}
  .flex
    .inline-flex.text-sm.gap-1
      p {{ def?.lang }}
      p {{ def?.part }}
    .flex-1
    dict-links(:links="links" type="word")

    la-link.link(
      @click.stop.prevent="dictLink.def = dictLink.def == hash ? null : hash"
      :class="{ active: dictLink.def == hash || links[dictLink.word] }"
      )
</template>

<style lang="postcss" scoped>
.link {
  @apply cursor-pointer transition ml-2 p-1 bg-light-100 rounded-xl text-xl;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>