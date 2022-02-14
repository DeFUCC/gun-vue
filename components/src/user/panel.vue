<script setup>
import { computed } from 'vue'

import { useUser, useColor, useBackground } from '@composables'
const { user, leave } = useUser()

const colorDeep = useColor('deep')
const emit = defineEmits(['browse'])

const bg = computed(() => useBackground({ pub: user.pub, size: 600, light: 0.5, draw: 'circles' }))

</script>

<template lang='pug'>
.p-4.flex.items-center(
  v-if="user.is"
  :style="{ ...bg }"
  )
  .flex.items-center
    user-avatar(:size="120")
    .text-2xl.mx-2.font-bold {{ user?.name }}
  account-mate-button(:pub="user.pub")
  .flex-1 
  util-pulse(:blink="user.blink")
  button.p-2.text-2xl(@click="user.db.get('safe').get('saved').put(!user.safe.saved)")
    la-lock(v-if="user.safe.saved")
    la-unlock(v-else)
  button.text-2xl.ml-1.p-2(@click="leave()")
    ion-exit-outline
</template>