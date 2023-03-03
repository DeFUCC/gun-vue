<script setup>
import { safeHash } from '#composables';

</script>

<template lang="pug">
gift-form(@sent="$router.push(`/gifts/${safeHash($event)}`)" )
</template>