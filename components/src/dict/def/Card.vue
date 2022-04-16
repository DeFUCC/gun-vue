<script setup>
import { ref } from 'vue'
import { useGun, useUser, useColor, useDictRecords, dictRecord, langParts } from '@composables';

const props = defineProps({
  hash: String,
  authors: Object,
})

const color = useColor('light')

const gun = useGun()
const { user } = useUser()

const def = ref()

gun.get('dict').get('#def').get(props.hash).once((d, k) => {
  def.value = JSON.parse(d)
})

const links = useDictRecords(props.hash)
</script>

<template lang='pug'>
.flex.flex-col.rounded-xl.text-xl.p-2(
  :style="{ backgroundColor: color.hex(hash) }"
  ) 
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
    dict-links(:links="links" type="word")

    la-link.link(
      v-if="user.is"
      @click.stop.prevent="dictRecord.def = dictRecord.def == hash ? null : hash"
      :class="{ active: dictRecord.def == hash || links[dictRecord.word] }"
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