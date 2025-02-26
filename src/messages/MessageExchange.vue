<script setup lang="ts">
import { toRef, computed } from "vue"
import { useAccount, selectedUser } from '../composables'
import { useMessages } from './useMessages'
import { AccountAvatar, ChatInput, ChatMessages, TorrentUpload, UiPanel } from '../components'
import AccountHome from "../account/AccountHome.vue"
import FileShare from "../files/FileShare.vue"

const props = defineProps({
  pub: {
    default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk',
    type: String
  }
})

defineEmits(['user', 'back'])

const { account } = useAccount(toRef(props, 'pub'));

const chat = computed(() => useMessages(props.pub))


</script>

<template lang="pug">
.m-0.flex.flex-col.bg-stone-400.dark-bg-dark-400
  .flex-0.p-2.flex.flex-wrap.items-center.gap-2.sticky.top-0.bg-light-800.bg-op-30.backdrop-blur.dark-bg-dark-800.dark-bg-op-30.z-100.shadow
    button.p-2.bg-light-300.dark-bg-dark-400.rounded-xl(@click="$emit('back')")
      .i-la-angle-left
    account-avatar.cursor-pointer(:pub="pub" @click="$emit('user', pub)")
    .text-lg.font-bold.p-2 {{ account.profile?.name }}
    .text-lg {{ account.lastSeen }}
    .flex-1
    slot
  ChatMessages.max-w-65ch.mx-auto(:messages="chat.sorted")
  .sticky.bottom-0.flex-0.bg-light-900.dark-bg-dark-600.p-4.flex.gap-2
    FileShare(@url="chat.send(pub, $event)")
    chat-input.flex-1(@submit="chat.send(pub, $event)")

  UiPanel(@close="selectedUser.pub = ''" :open="!!selectedUser.pub")
    AccountHome(:pub="selectedUser.pub" @chat="emit('user', $event)")
</template>