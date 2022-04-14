<script setup>
import { useDefs, useColor, langParts, languages, dictLink } from '@composables';

const deepColor = useColor('deep')

defineEmits(['def'])

const { def, addDef, defs } = useDefs()
</script>

<template lang='pug'>
.flex.flex-col.gap-2
  transition(name="fade" mode="out-in")
    dict-word-card(
      v-if="dictLink?.word" 
      :key="dictLink.word"
      :hash="dictLink.word"
      )
  .flex.flex-wrap.gap-2
    select.pl-2(v-model="def.lang")
      option(v-for="lang in languages" :value="lang.code") {{ lang.native }}
    button.button.capitalize(
      v-for="(part, p) in langParts" :key="part"
      @click="def.part = p"
      :class="{ active: def.part == p }"
    ) {{ p }}
  .flex.w-full.gap-2
    textarea.p-2.rounded-lg.flex-1(v-model="def.text" placeholder="Enter a definition")
    button.button(@click="addDef()") Add
  .flex.flex-wrap.gap-2
    dict-def-card(
      @click="$emit('def', hash)"
      v-for="(d, hash) in defs" :key="hash"
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
