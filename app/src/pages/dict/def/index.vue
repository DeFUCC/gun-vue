<script setup>
import { safeHash } from '@composables';
</script>

<template lang='pug'>
dict-defs(@def="$router.push(`/dict/def/${safeHash($event)}`)")
</template>