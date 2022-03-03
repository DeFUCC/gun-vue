<script setup>
import { ref, reactive, computed, toRef } from "vue"
import { useAccount, usePrivateChat } from '@composables'
const props = defineProps({
  pub: String
})

const { account } = useAccount(toRef(props, 'pub'));

const { send, messages } = usePrivateChat(props.pub) 
</script>

<template>
  <div class="m-0 flex flex-col">
    <div class="flex-0 p-4 flex flex-wrap items-center">
      <account-avatar :pub="pub"></account-avatar>
      <div class="text-lg font-bold p-2">{{ account.profile?.name }}</div>
      <div class="text-lg">{{ account.lastSeen }}</div>
    </div>
    <chat-messages class="bg-dark-50" :messages="messages"></chat-messages>
    <div class="flex-0 bg-light-900 p-4">
      <chat-input @submit="send($event)"></chat-input>
    </div>
  </div>
</template>