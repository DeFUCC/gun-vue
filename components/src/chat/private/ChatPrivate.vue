<script setup>
import { toRef } from "vue"
import { useAccount, usePrivateChat } from '#composables'
const props = defineProps({
  pub: {
    default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk',
    type: String
  }
})

defineEmits('user')

const { account } = useAccount(toRef(props, 'pub'));

const { send, sorted } = usePrivateChat(props.pub)

</script>

<template lang="pug">
.m-0.flex.flex-col
  .flex-0.p-4.flex.flex-wrap.items-center
    account-avatar(
      :pub="pub" 
      @click="$emit('user')"
      )
    .text-lg.font-bold.p-2 {{ account.profile?.name }}
    .text-lg {{ account.lastSeen }}
  chat-messages.bg-dark-50(:messages="sorted")
  .flex-0.bg-light-900.p-4
    chat-input(@submit="send($event)")
</template>