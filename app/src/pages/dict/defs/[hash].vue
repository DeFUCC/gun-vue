<script setup>
import { unsafeHash, safeHash, dictRecord } from '#composables';
import { watch } from 'vue';

const props = defineProps({
  hash: { type: String, default: '' }
})

watch(() => props.hash, hash => {
  let rec = unsafeHash(hash)
  dictRecord.word = null
  dictRecord.def = rec
}, { immediate: true })
</script>

<template lang="pug">
dict-def-page.m-4(
  :key="hash" 
  :hash="unsafeHash(hash)"
  @word="$router.push(`/dict/words/${safeHash($event)}`)"
  @close="$router.push(`/dict/`)"
  )
</template>