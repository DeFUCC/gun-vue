<script setup>
import { useWords, useColor, renderWord, letterFilter } from '@composables';

const color = useColor('light')

defineEmits(['word'])

const { search, words, word, addWord } = useWords()

</script>

<template lang='pug'>
.flex.flex-col.gap-2 
  input.p-2.rounded-lg(v-model="search" placeholder="Enter a word")
  .flex.flex-wrap.text-xl
    button.uppercase.button.p-1(v-for="(letter, l) in word.split('')" :key="letter"
    @click="addWord()"
    ) {{ letter }}
  .flex.flex-wrap.gap-2.text-2xl
    .px-2.py-1.rounded-lg.bg-light-700.cursor-pointer.capitalize(
      @click="$emit('word', hash)"
      v-for="(w, hash) in words" :key="hash"
      :style="{ backgroundColor: color.hex(hash) }"
      ) {{ letterFilter(w) }}
</template>

