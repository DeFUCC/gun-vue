<script setup>
import { safeHash } from '#composables';

import { DictWordList } from '../components'
</script>

<template lang="pug">
dict-word-list.bg-light-700.p-4.dark-bg-dark-400(@word="$router.push(`/dict/words/${safeHash($event)}`)")
</template>