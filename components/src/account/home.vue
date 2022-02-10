<script setup>
import { useAccount, useBackground } from '@composables';
import { computed } from 'vue'
const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse', 'feed', 'post'])

const { account } = useAccount(props.pub);

const bg = computed(() => useBackground(props.pub, 600, 0.5, 'circles'))

</script>

<template lang='pug'>
.flex.flex-col.rounded-3xl.overflow-hidden.shadow-xl
  .p-4.flex.items-center.bg-cover.border-b-6(:style="{ borderColor: account.color, ...bg }")
    account-avatar(:pub="pub" :size="120")
    .flex.flex-col.ml-4
      .text-2xl.font-bold {{ account.profile?.name }}
      .mt-2 {{ account.lastSeen }}
    .flex-1
    account-mate-button.m-4(:pub="pub")
  account-profile.p-4(:pub="pub")
  .p-4.flex.flex-col
    account-mate-list(:pub="pub" @browse="$emit('browse', $event)")
    //- account-stars(:pub="pub" @feed="$emit('feed', $event)")
    account-reactions.m-2(:pub="pub" @post="$emit('post', $event)")
</template>