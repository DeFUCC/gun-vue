<script setup>import { usePrivateChatList } from '@composables';

const props = defineProps({
  title: { type: String, default: 'Private chats' }
})

const { list } = usePrivateChatList()

const emit = defineEmits(['chat'])



</script>

<template lang='pug'>
.flex.flex-col.gap-2.p-4
  .font-bold.text-xl {{ title }}
  .p-2.rounded-xl.flex.items-center.bg-light-900.cursor-pointer(v-for="( chat, pub ) in list" :key="pub" @click="$emit('chat', pub)") 
    account-badge(:pub="pub" :size="42")
    .flex-1
    chat-private-count(:pub="pub")
</template>