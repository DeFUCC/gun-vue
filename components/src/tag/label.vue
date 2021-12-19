<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})
import { useTagPosts } from '@composables';
const { count } = useTagPosts(toRef(props, 'tag'))
</script>

<template lang='pug'>
.p-2 {{ tag }} {{ count }}
</template>