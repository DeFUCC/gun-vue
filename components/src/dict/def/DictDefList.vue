<script setup>
import { useDefs, langParts, useUser, dictRecord } from '#composables';


const { user } = useUser()

defineEmits(['def', 'root'])

const { def, addDef, found, linked } = useDefs()
</script>

<template lang="pug">
.flex.flex-col.gap-2
  .font-bold.text-xl.mb-2.cursor-pointer(@click="$emit('root', 'defs')") Definitions
  transition(
    name="fade" 
    mode="out-in"
    )
    dict-word-card(
      v-if="dictRecord?.word" 
      :key="dictRecord.word"
      :hash="dictRecord.word"
      )

  .flex.w-full.gap-2.flex-wrap
    .flex.flex-1.gap-2.m-2(v-if="user.is")
      button.button.capitalize.text-xs(
        v-for="(part, p) in langParts" 
        :key="part"
        :class="{ active: def.part == p }"
        @click="def.part = p"
      ) {{ p }}
    .flex.gap-2.flex-1
      textarea.p-2.rounded-lg.flex-auto(
        v-model="def.text" 
        placeholder="Enter a definition"
        )
      button.button(@click="user.is ? addDef() : user.auth = true") Add
  .flex.flex-wrap.gap-2
    transition-group(name="list")
      template(v-if="!def.text")
        dict-def-card.cursor-pointer(
          v-for="(d, hash) in linked"
          :key="hash" 
          :hash="hash"
          @click="$emit('def', hash)"
          ) 
      template(v-else)
        dict-def-card.cursor-pointer(
          v-for="(result) in found"
          :key="result.item.hash" 
          :style="{ opacity: 1 - result.score }"
          :hash="result.item.hash"
          @click="$emit('def', result.item.hash)"
          ) 

</template>

<style lang="postcss" scoped>

</style>
