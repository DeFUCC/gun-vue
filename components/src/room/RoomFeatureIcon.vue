<script setup>
const props = defineProps({
  icon: {
    default: 'space',
    type: String
  }
})
</script>

<template lang='pug'>
ph-house-simple(v-if="icon.includes('home') || icon == '/'")
ph-hands-clapping(v-if="icon.includes('space')")
ph-newspaper(v-if="icon.includes('posts')")
ph-house(v-if="icon.includes('rooms')")
la-broadcast-tower(v-if="icon.includes('topics')")
ph-users(v-if="icon.includes('users')")
ph-books(v-if="icon.includes('dict')")
la-toolbox(v-if="icon.includes('projects')")
la-sun(v-if="icon.includes('gifts')")
</template>