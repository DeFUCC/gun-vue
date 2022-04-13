<script setup>
import { unsafeHash } from '@composables';

const props = defineProps({
  hash: { type: String }
})
unsafeHash
</script>

<template lang='pug'>
dict-word(:hash="unsafeHash(hash)" :key="hash")
</template>