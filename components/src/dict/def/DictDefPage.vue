<script setup>
import { ref } from 'vue'
import { useGun, useColor, useDictRecordsFor, dictRecord, langParts, useUser } from '@composables';

const props = defineProps({
  hash: String
})

defineEmits(['word', 'close'])

const color = useColor('light')

const gun = useGun()
const { user } = useUser()

const def = ref()

gun.get('dict').get('#def').get(props.hash).once((d, k) => {
  def.value = JSON.parse(d)
})

const links = useDictRecordsFor(props.hash)
</script>

<template lang='pug'>
.flex.flex-col.rounded-xl.text-xl.p-4(
  :style="{ backgroundColor: color.hex(hash) }"
  )
  .flex.flex-col.mb-4 
    .text-xl.flex.flex-wrap.items-center(
      style="text-decoration-line: underline"
      :style="{ textDecorationStyle: langParts[def?.part]?.underline, textDecorationColor: color.hex(hash) }"
      ) {{ def?.text }}
      la-link.link(
        v-if="user.is"
        @click.stop.prevent="dictRecord.def = dictRecord.def == hash ? null : hash"
        :class="{ active: dictRecord.def == hash || links[dictRecord.word] }"
        )

      .flex-1
      button.cursor-pointer.p-2(@click="$emit('close')")
        la-times.text-xl
    .flex
      .inline-flex.text-sm.gap-2
        .font-bold {{ def?.lang }}
        p {{ def?.part }}




  .flex.flex-wrap.gap-2
    .p-0(v-for="(authors, h) in links" :key="h")
      template(v-if="Object.keys(authors).length > 0") 
        dict-word-card.cursor-pointer(:hash="h" @click="$emit('word', h)")
          dict-link-list(:links="{ [h]: authors }" :avatar="true")

</template>

<style lang="postcss" scoped>
.link {
  @apply cursor-pointer transition ml-2 p-1 bg-light-100 rounded-xl text-xl;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>