<script setup>
import { safeHash } from '@composables';
</script>

<template lang='pug'>
dict-def-list(@def="$router.push(`/dict/defs/${safeHash($event)}`)")
</template>