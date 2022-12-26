<script setup>

</script>

<template lang="pug">
.flex.flex-col.bg-dark-50.bg-opacity-70
  .text-xl.text-center.mt-2.font-bold.flex.items-center.justify-center.gap-2
    a.underline(href="https://gun.eco" target="_blank") Gun
    span + 
    a.underline(href="https://vuejs.org" target="_blank") Vue
    span = ✨
  .flex.flex-wrap.justify-center.z-200.text-2xl.w-full.gap-4.py-4
    a.btn(href="/components/" target="_blank")
      la-book
      .bar
        .title Documentation
        .subtitle Component stories 
    a.btn(href="https://www.npmjs.com/org/gun-vue" target="_blank")
      la-npm
      .bar
        .title Packages
        .subtitle Install and use
    a.btn(href="https://github.com/defucc/gun-vue" target="_blank")
      la-github
      .bar
        .title Repository
        .subtitle Contribute code
    a.btn(href="https://ko-fi.com/davay" target="_blank" title="Sponsorship")
      cib-ko-fi
      .bar
        .title Support
        .subtitle Donate money
    a.btn(
      href="https://homescreen.hns.siasky.net/#/skylink/AQC7upIKykiM-nYJA6Ac-Q4PHRtYsHDVS1Ne-M2ELcZU2A" target="_blank"
      )
      simple-icons-skynet
      .bar
        .title Homescreen
        .subtitle Install the skapp
</template>

<style lang="postcss" scoped>
.btn {
  @apply flex gap-2 items-center transition bg-light-100/70 py-1 px-2 rounded-lg hover-bg-light-100;
}

.title {
  @apply text-lg font-bold;
}

.subtitle {
  @apply text-xs;
}

.bar {
  @apply flex-1 pb-1 flex flex-col gap-1;
}
</style>