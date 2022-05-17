<script setup>
import { useAccount, useUser, useBackground } from '@composables';
import { computed } from 'vue'
const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse', 'feed', 'post', 'chat'])

const { account } = useAccount(props.pub);
const { user } = useUser()

const bg = computed(() => useBackground({ pub: props.pub, size: 600, light: 0.5, draw: 'circles' }))

</script>

<template lang='pug'>
.flex.flex-col.rounded-3xl.overflow-hidden.shadow-xl
  .p-4.flex.items-center.bg-cover.border-b-6(:style="{ borderColor: account.color, ...bg }")
    account-avatar(:pub="pub" :size="120")
    .flex.flex-col.ml-4.mx-4
      .text-2xl.font-bold {{ account.profile?.name }}
      .mt-2 {{ account.lastSeen }}
    .flex-1
    account-mate-button.m-4(:pub="pub")
    chat-private-count(:pub="pub" v-if="user.is" @chat="$emit('chat')")
  account-profile.p-4(:pub="pub")
  .p-4.flex.flex-col
    account-mate-list(:pub="pub" @browse="$emit('browse', $event)")
    //- account-stars(:pub="pub" @feed="$emit('feed', $event)")
    account-reactions.m-2(:pub="pub" @post="$emit('post', $event)")
</template>