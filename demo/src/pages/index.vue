<script setup>
</script>

<template lang="pug">
.flex.flex-col
    .flex.flex-wrap.shadow-lg.m-2.p-4.rounded-3xl.bg-light-300
        img.w-full.max-w-64(src="/gun-vue-logo.svg")
        .flex.flex-col.ml-8
            .font-bold.text-3xl.mb-4 @gun-vue
            .my-4.max-w-100 It's a collection of essential building blocks to create a variety of decentralized apps for online and offline collaboration. It's a moment when we can feel the nature of distributed networking and have fun together!
            .flex.text-4xl.items-center.-mx-2
                a.m-1(href="docs/index.html" target="_blank")
                    la-book
                a.m-1(href="https://github.com/defucc/gun-vue" target="_blank")
                    la-github
    .flex.flex-wrap.shadow-lg.m-2.rounded-3xl.bg-light-300.overflow-hidden
        user-home
</template>

<style scoped>
.card {
    @apply bg-light-300 shadow-md m-4 rounded-xl overflow-hidden;
}
</style>