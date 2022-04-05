<script setup>

</script>

<template lang='pug'>

.flex.flex-wrap.justify-center.z-200.text-2xl.w-full.gap-2.py-4.bg-dark-50.bg-opacity-80
  a.btn.flex.items-center(href="https://homescreen.hns.siasky.net/#/skylink/AQC7upIKykiM-nYJA6Ac-Q4PHRtYsHDVS1Ne-M2ELcZU2A" target="_blank")
    simple-icons-skynet
    .text-sm.hidden.sm_block.ml-2 Homescreen
  a.btn.flex.items-center(href="/docs/" target="_blank")
    la-book-open
    .text-sm.hidden.sm_block.ml-2 Documentation
  a.btn.flex.items-center(href="https://www.npmjs.com/org/gun-vue" target="_blank")
    la-npm
    .text-sm.hidden.sm_block.ml-2 Packages
  a.btn.flex.items-center(href="https://github.com/defucc/gun-vue" target="_blank")
    la-github
    .text-sm.hidden.sm_block.ml-2 Repository
  a.btn.flex.items-center(href="https://ko-fi.com/davay" target="_blank" title="Sponsorship")
    cib-ko-fi
    .text-sm.hidden.sm_block.ml-2 Support
</template>

<style lang="postcss" scoped>
.btn {
  @apply bg-light-100/30 p-2 rounded-lg hover_bg-light-100/70;
}
</style>