<script setup>
import { ref } from 'vue'
import { useGun, useUser, useColor, useDictRecordsFor, dictRecord, langParts } from '#composables';
import { DictLinkList, DictLinkButton } from '../components'

const props = defineProps({
  hash: {
    type: String, default: ''
  },
  authors: {
    type: Object, default: () => ({})
  },
})

const color = useColor('light')

const gun = useGun()
const { user } = useUser()

const def = ref()

gun.get('dict').get('#def').get(props.hash).once((d) => {
  def.value = JSON.parse(d)
})

const links = useDictRecordsFor(props.hash)



</script>

<template lang="pug">
.flex.flex-col.rounded-xl.text-xl.p-2.bg-light-800.dark-bg-dark-400
  .text-lg.flex.items-center.flex-wrap(
    style="text-decoration-line: underline"
    :style="{ textDecorationStyle: langParts[def?.part]?.underline, textDecorationColor: color.hex(hash) }"
    ) {{ def?.text }}

  .flex.flex-wrap.items-center
    .inline-flex.text-sm.gap-1
      .font-bold {{ def?.lang }}
      p {{ def?.part }}
    slot
    .flex-1
    dict-link-list(
      :links="links" 
      type="word"
      )
    dict-link-button(
      :hash="hash"
      type="def"
      :my="links[dictRecord.word]?.[user.pub]"
      )
</template>

<style lang="postcss" scoped>
.link {
  @apply cursor-pointer transition ml-2 p-1 bg-light-100 dark-bg-dark-600 rounded-xl text-xl;
}

.link.active {
  @apply bg-dark-50 text-light-200;
}
</style>