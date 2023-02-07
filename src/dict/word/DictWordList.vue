<script setup>
import { useWords, useUser, dictRecord } from '#composables';


const { user } = useUser()

defineEmits(['word', 'root', 'def'])

const { input, found, linked, addWord } = useWords()

</script>

<template lang="pug">
.flex.flex-col.gap-2 
  .font-bold.text-xl.mb-2.cursor-pointer(
    @click="$emit('root', 'words')"
    ) Words
  transition(
    name="fade" 
    mode="out-in"
    )
    dict-def-card(
      v-if="dictRecord.def" 
      :key="dictRecord.def" 
      :hash="dictRecord.def"
      )
  .flex.gap-2
    input.p-2.rounded-lg.flex-1(
      v-model="input" 
      placeholder="Enter a word"
      )
    button.button(@click="user.is ? addWord() : user.auth = true") Add

  .flex.flex-wrap.gap-2
    transition-group(name="list")
      template(v-if="!input")
        dict-word-card(
          v-for="(w, hash) in linked"
          :key="hash"
          :hash="hash" 
          @def="$emit('def', $event)"
          @click="$emit('word', hash)"
          )
      template(v-else)
        dict-word-card(
          v-for="result in found"
          :key="result.item.hash"
          :style="{ opacity: 1 - result.score }" 
          :hash="result.item.hash"
          @def="$emit('def', $event)"
          @click="$emit('word', result.item.hash)"
          )
        
</template>

<style lang="postcss" scoped>

</style>
