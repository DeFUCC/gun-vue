<script setup>import { useAccount } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const emit = defineEmits(['browse'])

const { account } = useAccount(toRefs(props).pub);
</script>

<template lang='pug'>
.flex.flex-col.m-2.rounded-3xl.overflow-hidden.shadow-xl
  .p-4(:style="{ backgroundColor: account.color }")
    account-avatar(:pub="pub" :size="120")
    account-mate(:pub="pub")
  account-profile.p-4(:pub="pub")
  .p-4
    .text-lg.ml-2.mb-2.font-bold Mates
    account-mates(:pub="pub" @browse="$emit('browse', $event)")
    account-stars(:pub="pub")
</template>