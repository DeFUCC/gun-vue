<script setup>

const props = defineProps({
  pub: { type: String, default: '' }
})


</script>

<template lang='pug'>
account-home(:pub="pub" @browse="$router.push(`/users/${$event}`)" :key="pub")
</template>