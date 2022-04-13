<script setup>
import { useGun, currentRoom, hashObj, useColor, renderWord } from '@composables';
import { ref, computed, reactive } from 'vue'

const deepColor = useColor('deep')

defineEmits(['word'])

const gun = useGun()

const search = ref('')

const word = reactive({
  text: computed(() => {
    let clean = search.value.toLowerCase().matchAll(/\p{L}/gu, '')
    return Array.from(clean).map(el => el[0]).join('')
  }),
  stress: null
})

async function addWord() {
  const { hash, hashed } = await hashObj(word)
  gun.get('#word').get(hash).put(hashed)
  search.value = ''
  word.stress = null
}

const words = reactive({})

gun.get('#word').map().once((d, k) => {
  words[k] = JSON.parse(d)
})


</script>

<template lang='pug'>
.flex.flex-col.gap-2
  input.p-2.rounded-lg(v-model="search" placeholder="Enter a word")
  .flex.flex-wrap.text-xl
    button.uppercase.button.p-1(v-for="(letter, l) in word.text.split('')" :key="letter"
    @click="word.stress = l"
    :class="{ active: l == word.stress }"
    ) {{ letter }}
  button.button(v-if="word.text && word.stress !== null" @click="addWord()") Add 
  .flex.flex-wrap.gap-2
    .px-2.py-1.rounded-lg.bg-light-700.border-2.cursor-pointer(
      @click="$emit('word', hash)"
      v-for="(w, hash) in words" :key="hash"
      :style="{ borderColor: deepColor.hex(hash) }"
      v-html="renderWord(w)"
      ) 
</template>

