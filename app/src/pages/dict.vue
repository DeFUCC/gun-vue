<script setup>
import { safeHash } from '@composables';
import { dictLang, languages, useDictLangs } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col
  dict-panel(@home="$router.push('/dict/')")
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component.sticky.top-2.shadow-lg.z-20(:is="Component" )
  .flex.flex-wrap.gap-4.p-4(:key="dictLang")

    .p-4.flex.flex-col.bg-light-800.shadow.rounded-xl(style="flex: 1 1 100px") 
      router-link.text-xl.font-bold.mb-2(to="/dict/words/") WORDS
      dict-word-list(@word="$router.push(`/dict/words/${safeHash($event)}`)" @def="$router.push(`/dict/defs/${safeHash($event)}`)")
    .p-4.flex.flex-col.bg-light-800.shadow.rounded-xl(style="flex: 1 1 100px") 
      router-link.text-xl.font-bold.mb-2(to="/dict/defs/") DEFINITIONS
      dict-def-list(@def="$router.push(`/dict/defs/${safeHash($event)}`)" @word="$router.push(`/dict/words/${safeHash($event)}`)")

</template>