<script setup>
import { unsafeHash, safeHash, dictRecord } from '@composables';
import { watch } from 'vue';

const props = defineProps({
  hash: { type: String }
})

watch(() => props.hash, hash => {
  let rec = unsafeHash(hash)
  dictRecord.word = null
  dictRecord.def = rec
}, { immediate: true })
</script>

<template lang='pug'>
dict-def-page.m-4(
  :hash="unsafeHash(hash)" :key="hash"
    @word="$router.push(`/dict/words/${safeHash($event)}`)"
    @close="$router.push(`/dict/`)"
)
</template>