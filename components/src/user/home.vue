<script setup>
import { useUser } from '@composables';

const emit = defineEmits(['browse', 'close'])

const { user } = useUser()

function isSafe() {
  user.db.get('safe').get('saved').put(true)
}

</script>

<template lang='pug'>
.flex.flex-col.items-center.w-full
  user-login(v-if="!user.is")

  .flex.flex-col(v-else)
    user-panel(@browse="$emit('browse', $event); $emit('close')")
    user-profile
    account-mates(:pub="user.pub"  @browse="$emit('browse', $event)")
    ui-layer.flex.flex-col.items-center(:open="user.is && !user.safe?.saved" closeButton @close="isSafe()")
      user-credentials(@close="isSafe()")
</template>