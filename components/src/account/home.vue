<script setup>
import { useAccount } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse', 'feed', 'post'])

const { account } = useAccount(props.pub);
</script>

<template lang='pug'>
.flex.flex-col.rounded-3xl.overflow-hidden.shadow-xl
  .p-4.flex.items-center(:style="{ backgroundColor: account.color }")
    account-avatar(:pub="pub" :size="120")
    .flex.flex-col.ml-4
      .text-2xl.font-bold {{ account.profile?.name }}
      .mt-2 {{ account.lastSeen }}
      account-mate(:pub="pub")
    .flex-1

  account-profile.p-4(:pub="pub")
  .p-4
    account-mates(:pub="pub" @browse="$emit('browse', $event)")
    account-stars(:pub="pub" @feed="$emit('feed', $event)")
</template>