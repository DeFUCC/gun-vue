<script setup>import { useAccount } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const { account } = useAccount(toRefs(props).pub);
</script>

<template lang='pug'>
.flex.flex-col.m-2.rounded-2xl.p-4.border-t-30(:style="{ borderColor: account.color }")
  account-avatar(:pub="pub" :size="120")
  account-profile(:pub="pub")
  account-mate(:pub="pub")
</template>