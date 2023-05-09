
<script setup>
import { defineProps, computed } from 'vue';

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
  position: {
    type: Object,
    default: () => ({ x: 0, y: 0 })
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
  return (longestRow + 1) * props.lineHeight * 0.42;
});

const height = computed(() => props.lineHeight + rows.value.length * props.lineHeight);
</script>

<template lang="pug">
g.opacity-20.hover-opacity-90.transition(:transform="`translate(${position.x}, ${position.y +20})`")
  rect(
    :width="width", 
    :x="-width/2" 
    :height="height", 
    rx="5"
    )
  text(:font-size="lineHeight*0.7" fill="currentColor")
    tspan(
      v-for="(row, index) in rows"
      :key="index"
      :dy="lineHeight"
      :x="0"
    ) {{ row }}
</template>

<style scoped></style>
