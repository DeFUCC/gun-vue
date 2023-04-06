<script setup lang="ts">
import { usePrivateChatList } from './usePrivate';
import { AccountBadge, ChatPrivateCount } from '../components'

const props = defineProps({
  current: {
    type: String,
    default: ''
  }
})

const list = usePrivateChatList()

defineEmits(['chat'])


</script>

<template lang="pug">
.flex.flex-col.p-4.gap-2.w-full
  slot
  .p-2.rounded-xl.flex.items-center.bg-light-500.dark-bg-dark-400.cursor-pointer(
    v-for="( chat, pub ) in list" 
    :key="pub" 
    :class="{current:pub==current}"
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