<script setup>
import { ref } from 'vue'
const props = defineProps({
  features: { type: Object, default: {} }
})

</script>

<template lang='pug'>
.flex.flex-wrap.text-sm.items-center.gap-1  
  .pr-2
    slot Features:
  .px-1.font-bold(v-for="(cert, c) in features" :key="c" :title="cert") {{ c }}
</template>