<script setup>
import { useUser, selectedUser, safeHash } from '@composables';

const props = defineProps({
  size: { type: Number, default: 42 }
})

const { user } = useUser()


defineEmits(['room', 'user', 'post', 'chat'])

</script>

<template lang="pug">
div.z-1000
  account-avatar.cursor-pointer(
    :size="size" 
    :border="2" 
    @click="user.auth = true" 
    :pub="user.pub"
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
  ui-layer(
    :open="selectedUser.pub" 
    @close="selectedUser.pub = null"
    )
    account-home.max-w-600px(
      :pub="selectedUser.pub" 
      @user="$emit('user', $event)" 
      @post="$emit('post', safeHash($event))"
      @chat="$emit('chat', selectedUser.pub)"
      @close="selectedUser.pub = null"
      :key="selectedUser.pub"
      )
</template>