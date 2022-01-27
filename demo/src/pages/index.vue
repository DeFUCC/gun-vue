<script setup>
</script>

<template lang="pug">
.flex.flex-col
  .flex.flex-wrap.shadow-lg.m-2.p-4.rounded-3xl.bg-light-300
    img.w-full.max-w-64(src="/gun-vue-logo.svg")
    .flex.flex-col.ml-8.max-w-120
      .font-bold.text-3xl.mb-4 @gun-vue
      .my-4 Gun-vue is a collection of essential building blocks to create a variety of decentralized apps for online and offline collaboration. It's a moment when we can feel the nature of distributed networking and have fun together!
      .my-2 All the data in the app is stored only on the client side - right in your browser. And it's reactively synced between all simultaneous visitors by Gun. So it's better to share a link to this page with your friend to have a more profound demo experience. 

      .my-4 
        router-link.text-2xl(to="/spaces") Spaces

      .my-4 We're building basic components and data structures as a foundation for various Vue 3 apps to built by anyone. Feel free to play with it and to make any contributions! 
      .flex.flex-wrap
        a.button.m-2.flex.items-center(href="/docs/" target="_blank")
          la-book-open.mr-4.text-3xl
          .text-xl Documentation
        a.button.m-2.flex.items-center(href="https://www.npmjs.com/org/gun-vue" target="_blank")
          la-npm.mr-4.text-3xl
          .text-xl Packages
        a.button.m-2.flex.items-center(href="https://github.com/defucc/gun-vue" target="_blank")
          la-github.mr-4.text-3xl
          .text-xl Repository
        a.button.m-2.flex.items-center(href="https://ko-fi.com/davay" target="_blank")
          cib-ko-fi.mr-4.text-3xl
          .text-xl Sponsorship


</template>
