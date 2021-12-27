<script setup>import { useAccount } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const { account } = useAccount(toRefs(props).pub)
</script>

<template lang='pug'>
.flex.flex-col.m-2.rounded-2xl.p-4(:style="{ backgroundColor: account.color }")
  account-avatar(:pub="pub" :size="120")
  account-profile(:pub="pub")
</template>