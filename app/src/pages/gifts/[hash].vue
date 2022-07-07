<script setup>
const props = defineProps({
  hash: { type: String, default: '' },
});

</script>

<template lang='pug'>
.p-4.bg-light-300.bg-opacity-40.shadow-lg.rounded-lg {{ hash }}
</template>