<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
import { useTag } from '@composables';
const { count } = useTag(toRef(props, 'tag'))
</script>

<template lang='pug'>
.p-2 {{ tag }} {{ count }}
</template>