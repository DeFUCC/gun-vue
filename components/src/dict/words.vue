<script setup>
import { useWords, useColor, renderWord } from '@composables';

const deepColor = useColor('deep')

defineEmits(['word'])

const { search, words, word, addWord } = useWords()

</script>

<template lang='pug'>
.flex.flex-col.gap-2
  input.p-2.rounded-lg(v-model="search" placeholder="Enter a word")
  .flex.flex-wrap.text-xl
    button.uppercase.button.p-1(v-for="(letter, l) in word.text.split('')" :key="letter"
    @click="word.stress = l; addWord()"
    :class="{ active: l == word.stress }"
    ) {{ letter }}
  .flex.flex-wrap.gap-2
    .px-2.py-1.rounded-lg.bg-light-700.border-2.cursor-pointer(
      @click="$emit('word', hash)"
      v-for="(w, hash) in words" :key="hash"
      :style="{ borderColor: deepColor.hex(hash) }"
      v-html="renderWord(w)"
      ) 
</template>

