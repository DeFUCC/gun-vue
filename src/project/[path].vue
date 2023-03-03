<script setup>

const props = defineProps({
  path: { type: String, default: '' }
})

</script>

<template lang="pug">
project-page(
  :key="path" 
  :path="path"
  @gift="$router.push(`/gifts/${$event}`)"
  @user="$router.push(`/users/${$event}`)"
)
</template>