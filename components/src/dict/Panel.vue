<script setup>
import { dictLang, languages, useDictLangs } from '@composables'

const langs = useDictLangs()

defineEmits(['home'])
</script>

<template lang='pug'>
.flex.flex-wrap.w-full.items-center.bg-light-900
  .flex-1.p-2.cursor-pointer.font-bold(@click="$emit('home')") Dictionary
  .flex.flex-wrap.gap-2.m-1
    button.button.uppercase.cursor-pointer.text-sm.flex(
      v-for="(num, lang) in langs" :key="lang"
      @click="dictLang = lang"
      :class="{ active: lang == dictLang }"
      ) 
        .font-bold {{ lang }} 
        .ml-1 {{ num }}
  select.m-2.p-2.w-30.rounded-lg(v-model="dictLang")
    option(v-for="lang in languages" :value="lang.code") {{ lang.native }}
</template>