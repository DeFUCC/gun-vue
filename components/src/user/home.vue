<script setup>
import { useUser } from '@composables';

const emit = defineEmits(['browse'])

const { user } = useUser()

</script>

<template lang='pug'>
.flex.flex-col.items-stretch.w-full
  user-login(v-if="!user.is")

  .flex.flex-col(v-else)
    user-panel(@browse="$emit('browse', $event)")
    user-profile
    account-mates(:pub="user.pub"  @browse="$emit('browse', $event)")
    ui-modal(:open="user.is && !user.safe?.saved" @close="user.db.get('safe').get('saved').put(true)")
      user-credentials
</template>