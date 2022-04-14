<script setup>
import { unsafeHash } from '@composables';

const props = defineProps({
  hash: { type: String }
})
</script>

<template lang='pug'>
dict-def-card(:hash="unsafeHash(hash)" :key="hash")
</template>