<script setup>
import { ref } from 'vue'
import { useGun, useColor, useDictRecords, dictRecord, langParts } from '@composables';

const props = defineProps({
  hash: String
})

defineEmits(['word'])

const color = useColor('light')

const gun = useGun()

const def = ref()

gun.get('dict').get('#def').get(props.hash).once((d, k) => {
  def.value = JSON.parse(d)
})

const links = useDictRecords(props.hash)
</script>

<template lang='pug'>
.flex.flex-col.rounded-xl.text-xl.p-4(
  :style="{ backgroundColor: color.hex(hash) }"
  ) 
  .text-xl(
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
      @click.stop.prevent="dictRecord.def = dictRecord.def == hash ? null : hash"
      :class="{ active: dictRecord.def == hash || links[dictRecord.word] }"
      )
  .flex.flex-wrap.gap-2
    .p-0(v-for="(authors, h) in links" :key="h")
      template(v-if="Object.keys(authors).length > 0") 
        dict-word-card.cursor-pointer(:hash="h" @click="$emit('word', h)")
          dict-links(:links="{ [h]: authors }" :avatar="true")

</template>

<style lang="postcss" scoped>
.link {
  @apply cursor-pointer transition ml-2 p-1 bg-light-100 rounded-xl text-xl;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>