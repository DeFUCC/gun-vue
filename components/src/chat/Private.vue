<script setup>
import { ref, reactive, computed, toRef } from "vue"
import { useAccount, useUser, useGun, currentRoom } from '@composables'

const props = defineProps({
  pub: String
})

const { account } = useAccount(toRef(props, 'pub'));
const gun = useGun();
const { user } = useUser();
const messages = reactive({});

const myChat = gun.user().get('chat').get(props.pub)
const yourChat = gun.user(props.pub).get('chat').get(user.pub)

yourChat.map().on((d, k) => {
  messages[k] = {
    timestamp: k,
    author: props.pub,
    text: d
  }
})

myChat.map().on((d, k) => {
  messages[k] = {
    timestamp: k,
    author: user.pub,
    text: d
  }
})

function send(message) {
  if (!message) return;
  let now = Date.now();
  myChat.get(now).put(message)
}
</script>

<template lang="pug">
.m-0.flex.flex-col
  .flex-0.p-4.flex.flex-wrap.items-center
    account-avatar(:pub="pub")
    .text-lg.font-bold.p-2 {{ account.profile?.name }}
    .text-lg {{ account.lastSeen }}
  chat-messages.bg-dark-50(:messages="messages")
  .flex-0.bg-light-900.p-4
    chat-input(@submit="send($event)")
</template>