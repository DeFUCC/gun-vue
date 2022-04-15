<script setup>
import { useDefs, useColor, langParts, languages, dictRecord } from '@composables';

const deepColor = useColor('deep')

defineEmits(['def'])

const { def, addDef, defs, linked } = useDefs()
</script>

<template lang='pug'>
.flex.flex-col.gap-2
  transition(name="fade" mode="out-in")
    dict-word-card(
      v-if="dictRecord?.word" 
      :key="dictRecord.word"
      :hash="dictRecord.word"
      )
  .flex.flex-wrap.gap-2
    .flex.flex-1.gap-1.m-2
      button.button.capitalize(
        v-for="(part, p) in langParts" :key="part"
        @click="def.part = p"
        :class="{ active: def.part == p }"
      ) {{ p }}
  .flex.w-full.gap-2
    textarea.p-2.rounded-lg.flex-1(v-model="def.text" placeholder="Enter a definition")
    button.button(@click="addDef()") Add
  .flex.flex-wrap.gap-2
    dict-def-card.cursor-pointer(
      @click="$emit('def', hash)"
      v-for="(d, hash) in linked" :key="hash"
      :hash="hash"
      )  

</template>

<style lang="postcss" scoped>
.link {
  @apply transition ml-2 p-1 bg-light-100 rounded-xl text-xl;

  &.active {
    @apply bg-dark-50 text-light-200;
  }
}
</style>
