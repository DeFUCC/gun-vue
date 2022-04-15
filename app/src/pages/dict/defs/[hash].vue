<script setup>
import { unsafeHash, safeHash } from '@composables';

const props = defineProps({
  hash: { type: String }
})
</script>

<template lang='pug'>
dict-def-page.m-4(
  :hash="unsafeHash(hash)" :key="hash"
    @word="$router.push(`/dict/words/${safeHash($event)}`)"
)
</template>