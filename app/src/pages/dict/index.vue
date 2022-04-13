<script setup>
import { safeHash } from '@composables';


</script>

<template lang='pug'>
.flex.flex-wrap
  .p-2.flex.flex-col(style="flex: 1 1 50%") 
    router-link.text-xl.font-bold.mb-2(to="/dict/word/") WORDS
    dict-words(@word="$router.push(`/dict/word/${safeHash($event)}`)")
  .p-2.flex.flex-col(style="flex: 1 1 50%") 
    router-link.text-xl.font-bold.mb-2(to="/dict/def/") DEFINITIONS
    dict-defs(@def="$router.push(`/dict/def/${safeHash($event)}`)")
</template>