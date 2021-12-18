<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})

</script>

<template lang='pug'>
tags-tag(:tag="tag" @close="$router.push('/tags/')")
</template>

<style scoped>
</style>