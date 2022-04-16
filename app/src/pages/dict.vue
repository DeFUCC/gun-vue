<script setup>
import { safeHash } from '@composables';
import { dictLang, languages, useDictLangs } from '@composables'

</script>

<template lang='pug'>
.flex.flex-col
  dict-panel(
    @home="$router.push('/dict/')"
    @my="$router.push('/dict/by/me/')"
    )
    button.button(@click="$router.push('/dict/by/me/')") My
    button.button(@click="$router.push('/dict/by/')") Authors
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component.sticky.top-0.shadow-lg.z-20(:is="Component" )
  .flex.flex-wrap.gap-4.p-4(:key="dictLang")

    .p-4.flex.flex-col.bg-light-800.shadow.rounded-xl(style="flex: 1 1 100px") 
      dict-word-list(
        @word="$router.push(`/dict/words/${safeHash($event)}`)" 
        @def="$router.push(`/dict/defs/${safeHash($event)}`)"
        )
    .p-4.flex.flex-col.bg-light-800.shadow.rounded-xl(style="flex: 1 1 100px") 
      dict-def-list(
        @root="$router.push(`/dict/${$event}`)"
        @def="$router.push(`/dict/defs/${safeHash($event)}`)" 
        @word="$router.push(`/dict/words/${safeHash($event)}`)"
        )

</template>