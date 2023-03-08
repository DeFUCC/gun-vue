<script setup>
import { safeHash } from '#composables';
</script>

<template lang="pug">
dict-def-list.bg-light-700.p-4.dark-bg-dark-400(@def="$router.push(`/dict/defs/${safeHash($event)}`)")
</template>