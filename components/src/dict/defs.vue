<script setup>
import { useGun, currentRoom, hashObj, useColor, renderWord, langParts } from '@composables';
import { ref, computed, reactive } from 'vue'

const deepColor = useColor('deep')

const gun = useGun()

const def = reactive({
  text: '',
  part: null
})
defineEmits(['def'])

async function addDef() {
  const { hash, hashed } = await hashObj(def)
  gun.get('#def').get(hash).put(hashed)
  def.text = ''
  def.part = null
}

const defs = reactive({})

gun.get('#def').map().once((d, k) => {
  defs[k] = JSON.parse(d)
})


</script>

<template lang='pug'>
.flex.flex-col.gap-2
  textarea.p-2.rounded-lg(v-model="def.text" placeholder="Enter a definition")
  .flex.flex-wrap.gap-2(v-if="def.text")
    button.button(
      v-for="(part, p) in langParts" :key="part"
      @click="def.part = p; addDef()"
      :class="{ active: def.part == p }"
    ) {{ p }}
  .flex.flex-wrap.gap-2
    .px-2.py-1.rounded-lg.bg-light-700.cursor-pointer(
      @click="$emit('def', hash)"
      v-for="(d, hash) in defs" :key="hash"
      style="text-decoration-line: underline"
      :style="{ borderColor: deepColor.hex(hash), textDecorationStyle: langParts[d.part].underline, textDecorationColor: deepColor.hex(hash) }"
      )  {{ d.text }}
</template>

