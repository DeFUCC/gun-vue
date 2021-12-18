<script setup>
const props = defineProps({
  tag: { type: String, default: 'tag' }
})

</script>

<template lang='pug'>
tag-posts(:tag="tag" @close="$router.push('/tags/')")
</template>

<style scoped>
</style>