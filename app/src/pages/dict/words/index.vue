<script setup>
import { safeHash } from '@composables';
</script>

<template lang='pug'>
dict-word-list.bg-light-700.p-4(@word="$router.push(`/dict/words/${safeHash($event)}`)")
</template>