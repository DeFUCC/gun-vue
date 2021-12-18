<script setup>
const location = window.location.href
</script>

<template lang="pug">
.p-4 
    .font-bold.text-3xl @gun-vue demo
    relay-pulse.card
    qr-show.w-400px(:data="location")
</template>

<style scoped>
.card {
    @apply bg-light-300 shadow-md m-4 rounded-xl overflow-hidden;
}
</style>