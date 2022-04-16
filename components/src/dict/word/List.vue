<script setup>
import { useWords, useColor, useUser, dictRecord } from '@composables';

const color = useColor('light')

const { user } = useUser()

defineEmits(['word', 'root'])

const { input, found, words, linked, word, addWord } = useWords()

</script>

<template lang='pug'>
.flex.flex-col.gap-2 
  .font-bold.text-xl.mb-2.cursor-pointer(@click="$emit('root', 'words')") Words
  transition(name="fade" mode="out-in")
    dict-def-card(v-if="dictRecord.def" :key="dictRecord.def" :hash="dictRecord.def")
  .flex.gap-2
    input.p-2.rounded-lg.flex-1(v-model="input" placeholder="Enter a word")
    button.button(@click="user.is ? addWord() : user.auth = true") Add

  .flex.flex-wrap.gap-2
    transition-group(name="list")
      template(v-if="!input")
        dict-word-card(
          @def="$emit('def', $event)"
          @click="$emit('word', hash)"
          v-for="(w, hash) in linked" :key="hash"
          :hash="hash"
          )
      template(v-else)
        dict-word-card(
          @def="$emit('def', $event)"
          @click="$emit('word', result.item.hash)"
          v-for="result in found" :key="result.item.hash"
          :style="{ opacity: 1 - result.score }"
          :hash="result.item.hash"
          )
        
</template>

<style lang="postcss" scoped>
</style>
