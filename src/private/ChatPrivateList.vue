<script setup lang="ts">
import { usePrivateChatList } from './usePrivateChat';
import { AccountBadge, ChatPrivateCount } from '../components'
import { ref } from 'vue';
import { useUser } from '#composables';

const props = defineProps({
  current: {
    type: String,
    default: ''
  }
})

const list = usePrivateChatList()

defineEmits(['chat'])

const open = ref(false)

const { user } = useUser()


</script>

<template lang="pug">
.flex.flex-col.gap-2.w-full
  slot
  .p-2.flex.gap-2(@click="$emit('chat', user?.pub)")
    .text-lg Personal chat: 
    account-badge(:pub="user?.pub")
    .flex-1
    chat-private-count(:pub="user?.pub")
  .p-2.rounded-xl.flex.items-center.bg-light-500.dark-bg-dark-400.cursor-pointer(
    v-for="(chat, pub) in list" 
    :key="pub" 
    :class="{ current: pub == current }"
    @click="$emit('chat', pub)"
    )
    account-badge(:pub="pub")
    .flex-1
    chat-private-count(:pub="pub")
</template>

<style scoped lang="postcss">
.current {
  @apply dark-bg-dark-900 bg-light-900
}
</style>