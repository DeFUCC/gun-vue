<script setup>
import { unsafeHash, safeHash, dictRecord } from '#composables';
import { watch } from 'vue';

const props = defineProps({
  hash: { type: String, default: '' }
})

watch(() => props.hash, hash => {
  let rec = unsafeHash(hash)
  dictRecord.def = null
  dictRecord.word = rec
}, { immediate: true })

</script>

<template lang="pug">
dict-word-page.m-4(
  :key="hash" 
  :hash="unsafeHash(hash)"
  @def="$router.push(`/dict/defs/${safeHash($event)}`)"
  @close="$router.push(`/dict/`)"
  )
</template>