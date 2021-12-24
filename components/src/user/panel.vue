<script setup>
import { useUser, color } from '@composables'
const { user, leave } = useUser()
</script>

<template lang='pug'>
.p-4.flex.items-center(
  v-if="user.is"
  :style="{ backgroundColor: color.deep.hex(user.pub) }"
  ) 
  account-avatar
  .text-2xl.mx-2.font-bold {{ user?.name }}
  .flex-1 
  util-pulse(:blink="user.blink")
  button.p-2.text-2xl(@click="user.db.get('safe').get('saved').put(!user.safe.saved)")
    la-lock(v-if="user.safe.saved")
    la-unlock(v-else)
  button.text-2xl.ml-1.p-2(@click="leave()")
    ion-exit-outline
</template>