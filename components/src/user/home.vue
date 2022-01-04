<script setup>
import { useUser } from '@composables';

const { user } = useUser()
</script>

<template lang='pug'>
.flex.flex-col.items-stretch.w-full.max-h-90vh.overflow-y-scroll
  .flex.flex-col(v-if="!user.is")
    user-auth
    .flex.justify-center or
    user-create
  .flex.flex-col(v-else)
    user-panel
    user-profile
    account-mates(:pub="user.pub")
    user-credentials.absolute.bg-light-400.top-38.left-2.right-2.rounded-3xl.shadow-xl
</template>