<script setup>
</script>

<template lang="pug">
.flex.flex-col
  .flex.flex-wrap.shadow-lg.m-2.p-4.rounded-3xl.bg-light-300
    img.w-full.max-w-64(src="/gun-vue-logo.svg")
    .flex.flex-col.ml-8
      .font-bold.text-3xl.mb-4 @gun-vue
      .my-4.max-w-100 Gun-vue is a collection of essential building blocks to create a variety of decentralized apps for online and offline collaboration. It's a moment when we can feel the nature of distributed networking and have fun together!
      .flex.flex-col
        a.button.m-1.flex.items-center(href="https://gun-vue.js.org" target="_blank")
          la-js.mr-4.text-3xl
          .text-xl gun-vue.js.org
        a.button.m-1.flex.items-center(href="https://www.npmjs.com/org/gun-vue" target="_blank")
          la-npm.mr-4.text-3xl
          .text-xl NPM packages
        a.button.m-1.flex.items-center(href="https://github.com/defucc/gun-vue" target="_blank")
          la-github.mr-4.text-3xl
          .text-xl GitHub monorepo
</template>
