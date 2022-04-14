<script setup>
import { safeHash } from '@composables';


</script>

<template lang='pug'>
.flex.flex-wrap.gap-2.p-2
  .p-4.flex.flex-col.bg-light-800.shadow.rounded-xl(style="flex: 1 1 48%") 
    router-link.text-xl.font-bold.mb-2(to="/dict/word/") WORDS
    dict-words(@word="$router.push(`/dict/word/${safeHash($event)}`)")
  .p-4.flex.flex-col.bg-light-800.shadow.rounded-xl(style="flex: 1 1 48%") 
    router-link.text-xl.font-bold.mb-2(to="/dict/def/") DEFINITIONS
    dict-defs(@def="$router.push(`/dict/def/${safeHash($event)}`)")
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component(:is="Component" )
</template>