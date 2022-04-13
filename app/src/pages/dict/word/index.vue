<script setup>
import { safeHash } from '@composables';
</script>

<template lang='pug'>
dict-words(@word="$router.push(`/dict/word/${safeHash($event)}`)")
</template>