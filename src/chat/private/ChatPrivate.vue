<script setup lang="ts">
import { toRef } from "vue"
import { useAccount, usePrivateChat } from '../../composables'
const props = defineProps({
  pub: {
    default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk',
    type: String
  }
})

defineEmits(['user'])

const { account } = useAccount(toRef(props, 'pub'));

const { send, sorted } = usePrivateChat(props.pub)

</script>

<template>
  <div class="m-0 flex flex-col">
    <div class="flex-0 p-4 flex flex-wrap items-center">
      <account-avatar :pub="pub" @click="$emit('user')"></account-avatar>
      <div class="text-lg font-bold p-2">{{ account.profile?.name }}</div>
      <div class="text-lg">{{ account.lastSeen }}</div>
    </div><chat-messages class="bg-dark-50" :messages="sorted"></chat-messages>
    <div class="flex-0 bg-light-900 p-4"><chat-input @submit="send($event)"></chat-input></div>
  </div>
</template>