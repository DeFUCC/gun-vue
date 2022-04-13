<script setup>
import { useDefs, useColor, langParts } from '@composables';

const deepColor = useColor('deep')

defineEmits(['def'])

const { def, addDef, defs } = useDefs()


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

