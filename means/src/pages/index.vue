<script setup>
</script>

<template lang="pug">
.flex.flex-col
  .flex.flex-wrap.shadow-lg.m-2.p-4.rounded-3xl.bg-light-300
    img.w-full.max-w-64(src="/gun-vue-logo.svg")
    .flex.flex-col.ml-8.max-w-120
      .font-bold.text-3xl.mb-4 MEANS
      .my-4 A game of creating collaborative dictionaries
      .my-2 Play together!

      a.button.m-2.flex.items-center(href="https://ko-fi.com/davay" target="_blank")
        cib-ko-fi.mr-4.text-3xl
        .text-xl Sponsorship


</template>
