<script setup>
import { useUser, selectedUser, safeHash } from '@composables';
import { ref, onMounted } from 'vue'

const props = defineProps({
  size: { type: Number, default: 42 }
})

const { user } = useUser()
const open = ref(false)

defineEmits(['room', 'user', 'post'])

</script>

<template lang="pug">
.mx-2
  account-avatar.cursor-pointer(
    :size="size" 
    :border="2" 
    @click="open = true" 
    :pub="user.pub"
    )
  ui-layer(
    :open="open" 
    @close="open = false"
    )
    user-home.max-w-600px(
      @room="$emit('room', $event)" 
      @user="$emit('user', $event)" 
      @close="open = false"
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