
<script setup>
import { useClipboard } from '@vueuse/core'
const props = defineProps({
  wallet: {
    type: Object,
    default: () => ({ currency: 'USD', account: 'Bank of America 1234567890', url: 'https://bankofamerica.com' })
  }
})

const { text, copy, copied, isSupported } = useClipboard({ source: props.wallet?.account })

</script>
<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.p-2.flex.flex-wrap.items-center.gap-2.border-1.rounded-xl
  .text-xl.font-bold.flex-0 {{ wallet.currency }}
  .flex-auto.flex.gap-1
    .text-xs.overflow-ellipsis.break-all(
      v-html="wallet.account"
      )
    .i-la-copy.w-10(
      v-if="isSupported" 
      :class="{ 'animate-bounce': copied }" 
      @click.stop="copy()"
      )
  a(
    v-if="wallet.url" 
    :href="wallet.url" 
    target="_blank"
    )
    .i-la-link
  slot
</template>