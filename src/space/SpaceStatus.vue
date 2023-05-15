
<script setup>
import { computed } from 'vue';

const props = defineProps({
  content: {
    type: String,
    required: true
  },
  maxRowLength: {
    type: Number,
    default: 50
  },
  lineHeight: {
    type: Number,
    default: 26
  },
  editable: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update'])

const rows = computed(() => {
  const contentLength = props.content.length;
  if (contentLength < 1) return []
  const rowBreaks = Math.ceil(contentLength / props.maxRowLength);
  const rows = [];

  for (let i = 0; i < rowBreaks; i++) {
    const start = i * props.maxRowLength;
    const end = start + props.maxRowLength;
    rows.push(props.content?.slice(start, end));
  }

  return rows;
});

const width = computed(() => {
  if (rows.value.length < 1) return 100
  const longestRow = Math.max(...rows.value.map(row => row.length));
  return (longestRow + 2) * props.lineHeight * 0.42;
});

const height = computed(() => props.lineHeight + rows.value.length * props.lineHeight);

function handleInput(ev) {
  emit('update', ev.target.value)
}
</script>

<template lang="pug">
g()
  //- rect(
  //-   :width="width", 
  //-   :x="0" 
  //-   :height="height", 
  //-   rx="5"
  //-   )
  //- text(:font-size="lineHeight*0.7" fill="currentColor" text-anchor="start")
  //-   tspan(
  //-     v-for="(row, index) in rows"
  //-     :key="index"
  //-     :dy="lineHeight"
  //-     :x="lineHeight/2"
  //-   ) {{ row }}
  foreignObject(x="-30" y="20" :width="width" :height="height*2" )
    textarea(
      :cols="maxRowLength" :rows="rows.length" 
      :disabled="!editable"
      @input="handleInput"
      :value="content")
</template>

<style scoped></style>
