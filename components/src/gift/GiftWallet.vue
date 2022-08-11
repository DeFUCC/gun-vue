<script setup>
const props = defineProps({
  wallet: {
    type: Object,
    default: { currency: 'USD', account: 'Bank of America 1234567890', url: 'https://bankofamerica.com' }
  }
})
</script>

<template lang='pug'>
.p-2.flex.flex-wrap.items-center.gap-2.border-1.rounded-xl
  .text-xl.font-bold.flex-0 {{ wallet.currency }}
  .flex-auto.text-xs.overflow-ellipsis.break-all(v-html="wallet.account")
  a(:href="wallet.url" target="_blank" v-if="wallet.url")
    la-link
  slot
</template>