<script setup>import { useAccount } from '@composables';

const { account } = useAccount('XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc')

</script>

<template lang="pug">
nav-bar
p {{ account }}
.p-0.min-h-75vh
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
.flex.flex-col.items-center.bg-dark-100.p-4.bg-opacity-30.-z-10
  util-tools
  .text-sm.mt-4 MIT 2022
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
