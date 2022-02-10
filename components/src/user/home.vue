<script setup>
import { computed, ref } from 'vue'
import { useUser } from '@composables';

const emit = defineEmits(['user', 'room', 'close'])

const { user } = useUser()

function isSafe() {
  user.db.get('safe').get('saved').put(true)
}

</script>

<template lang='pug'>
.flex.flex-col.items-center.w-full
  ui-layer(:open="user.is && !user.safe?.saved" closeButton @close="isSafe()")
    user-credentials(@close="isSafe()")

  user-login(v-if="!user.is")
  .flex.flex-col(v-else)
    user-panel(@browse="$emit('browse', $event); $emit('close')")
    .p-4.flex.flex-col.items-start
      user-profile
      account-mate-list(:pub="user.pub"  @browse="$emit('user', $event)")
      user-rooms(@browse="$emit('room', $event)")
    button.p-4.m-4.rounded-xl.font-bold.text-lg.shadow-md(
      @click="$emit('user', user.pub); $emit('close')"
      :style="{ backgroundColor: user.color }"
    ) Go to my page
</template>