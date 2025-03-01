<script setup>
const props = defineProps({
  icon: {
    default: 'space',
    type: String
  }
})
</script>

<template lang="pug">
.i-ph-house-simple(v-if="icon.includes('home') || icon == '/'")
.i-ph-hands-clapping(v-if="icon.includes('space')")
.i-ph-newspaper(v-if="icon.includes('posts')")
.i-ph-door(v-if="icon.includes('rooms')")
.i-ph-chats(v-if="icon.includes('chat')")
.i-ph-users(v-if="icon.includes('users')")
.i-ph-books(v-if="icon.includes('dict')")
.i-la-toolbox(v-if="icon.includes('projects')")
.i-la-sun(v-if="icon.includes('gifts')")
.i-la-file(v-if="icon.includes('files')")
.i-la-qrcode(v-if="icon.includes('qr')")
</template>