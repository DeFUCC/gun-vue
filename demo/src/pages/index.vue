<script setup>
const location = window.location.href
</script>

<template lang="pug">
.p-4 
    .flex.flex-wrap
        img.w-full.max-w-64(src="/gun-vue-logo.svg")
        .flex.flex-col
            .font-bold.text-3xl.ml-8 @gun-vue demo
            relay-pulse.card
    qr-show.w-400px(:data="location")
</template>

<style scoped>
.card {
    @apply bg-light-300 shadow-md m-4 rounded-xl overflow-hidden;
}
</style>