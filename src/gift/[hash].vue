<script setup>
import { unsafeHash } from '#composables';
import { computed } from 'vue'

const props = defineProps({
  hash: { type: String, default: '' },
});

const un = computed(() => unsafeHash(props.hash))

</script>

<template lang="pug">
gift-card(:hash="un")
</template>