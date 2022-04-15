<script setup>
import { safeHash } from '@composables';
</script>

<template lang='pug'>
dict-word-list(@word="$router.push(`/dict/words/${safeHash($event)}`)")
</template>