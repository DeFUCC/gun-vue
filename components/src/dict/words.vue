<script setup>
import { useWords, useColor, renderWord, letterFilter, dictLink, useLinks } from '@composables';

const color = useColor('light')

defineEmits(['word'])

const { input, found, words, word, addWord } = useWords()

</script>

<template lang='pug'>
.flex.flex-col.gap-2 
  transition(name="fade" mode="out-in")
    dict-def-card(v-if="dictLink.def" :key="dictLink.def" :hash="dictLink.def")
  .flex.gap-2
    input.p-2.rounded-lg.flex-1(v-model="input" placeholder="Enter a word")
    button.button(@click="addWord()") Add
  .flex.flex-wrap.gap-2
    transition-group(name="list")
      template(v-if="input")
        dict-word-card(
          @click="$emit('word', hash)"
          v-for="result in found" :key="result.item.hash"
          :style="{ opacity: 1 - result.score }"
          :hash="result.item.hash"
          )
      template(v-else)
        dict-word-card(
          @click="$emit('word', hash)"
          v-for="(w, hash) in words" :key="hash"
          :hash="hash"
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
