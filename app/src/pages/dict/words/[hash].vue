<script setup>
import { unsafeHash, safeHash } from '@composables';

const props = defineProps({
  hash: { type: String }
})
unsafeHash
</script>

<template lang='pug'>
dict-word-page.m-4(
  :hash="unsafeHash(hash)" :key="hash"
  @def="$router.push(`/dict/defs/${safeHash($event)}`)"
  )
</template>