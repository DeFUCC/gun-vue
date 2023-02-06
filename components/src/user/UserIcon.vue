<script setup>
import { useUser, selectedUser, safeHash } from '#composables';

const props = defineProps({
  size: { type: Number, default: 42 },
  showName: { type: Boolean, default: true }
})

const { user } = useUser()


defineEmits(['room', 'user', 'post', 'chat'])

</script>

<template lang="pug">
div.z-1000
  account-badge.cursor-pointer(
    :size="size"
    :showName="showName"
    :border="2" 
    :pub="user.pub" 
    @click="user.auth = true"
    )
  ui-panel(
    :open="user.auth" 
    @close="user.auth = false"
    )
    user-home.max-w-600px(
      @room="$emit('room', $event); user.auth = false" 
      @user="$emit('user', $event); user.auth = false" 
      @chat="$emit('chat', $event); user.auth = false"
      @close="user.auth = false"
      @post="$emit('post', safeHash($event)); user.auth = false"
      )
</template>
