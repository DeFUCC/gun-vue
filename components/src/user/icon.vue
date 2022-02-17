<script setup>
import { useUser, selectedUser, safeHash } from '@composables';
import { ref, onMounted } from 'vue'

const props = defineProps({
  size: { type: Number, default: 42 }
})

const { user } = useUser()


defineEmits(['room', 'user', 'post'])

</script>

<template lang="pug">
div
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
      @room="$emit('room', $event)" 
      @user="$emit('user', $event)" 
      @close="user.auth = false"
      )
  ui-layer(
    :open="selectedUser.pub" 
    @close="selectedUser.pub = null"
    )
    account-home.max-w-600px(
      :pub="selectedUser.pub" 
      @user="$emit('user', $event)" 
      @post="$emit('post', safeHash($event))"
      @close="selectedUser.pub = null"
      :key="selectedUser.pub"
      )
</template>