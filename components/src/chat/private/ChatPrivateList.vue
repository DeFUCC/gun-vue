<script setup>import { usePrivateChatList } from '@composables';

const props = defineProps({
  title: { type: String, default: 'Private chats' }
})

const { list } = usePrivateChatList()

const emit = defineEmits(['chat'])



</script>

<template lang='pug'>
.flex.flex-col.p-4.gap-2
  .font-bold.text-xl {{ title }}
  .flex.flex-wrap.gap-2
    .p-2.rounded-xl.flex.items-center.bg-light-900.cursor-pointer(v-for="( chat, pub ) in list" :key="pub" @click="$emit('chat', pub)") 
      account-badge(:pub="pub")
      .flex-1
      chat-private-count(:pub="pub")
</template>