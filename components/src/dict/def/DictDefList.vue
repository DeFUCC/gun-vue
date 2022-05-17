<script setup>
import { useDefs, useColor, langParts, useUser, dictRecord } from '@composables';

const deepColor = useColor('deep')

const { user } = useUser()

defineEmits(['def', 'root'])

const { def, addDef, defs, found, linked } = useDefs()
</script>

<template lang='pug'>
.flex.flex-col.gap-2
  .font-bold.text-xl.mb-2.cursor-pointer(@click="$emit('root', 'defs')") Definitions
  transition(name="fade" mode="out-in")
    dict-word-card(
      v-if="dictRecord?.word" 
      :key="dictRecord.word"
      :hash="dictRecord.word"
      )

  .flex.w-full.gap-2.flex-wrap
    .flex.flex-1.gap-2.m-2(v-if="user.is")
      button.button.capitalize.text-xs(
        v-for="(part, p) in langParts" :key="part"
        @click="def.part = p"
        :class="{ active: def.part == p }"
      ) {{ p }}
    .flex.gap-2.flex-1
      textarea.p-2.rounded-lg.flex-auto(v-model="def.text" placeholder="Enter a definition")
      button.button(@click="user.is ? addDef() : user.auth = true") Add
  .flex.flex-wrap.gap-2
    transition-group(name="list")
      template(v-if="!def.text")
        dict-def-card.cursor-pointer(
          @click="$emit('def', hash)"
          v-for="(d, hash) in linked" :key="hash"
          :hash="hash"
          ) 
      template(v-else)
        dict-def-card.cursor-pointer(
          @click="$emit('def', result.item.hash)"
          v-for="(result) in found" :key="result.item.hash"
          :style="{ opacity: 1 - result.score }"
          :hash="result.item.hash"
          ) 

</template>

<style lang="postcss" scoped>
</style>
