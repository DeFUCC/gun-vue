<script setup lang="ts">
import { computed } from 'vue'
import { MateButton, UserAvatar } from '../components'
import { useUser, useColor, useBackground } from '#composables'
const { user, leave } = useUser()

const colorDeep = useColor('deep')
const emit = defineEmits(['browse'])

const bg = computed(() => useBackground({ pub: user.pub, size: 600, light: 0.5, draw: 'circles' }))


</script>

<template lang="pug">
.p-4.flex.items-center.w-full(
  v-if="user.is"
  :style="{ ...bg }"
  )
  .flex.items-center
    user-avatar(:size="120")
    .text-xl.mx-2.font-bold {{ user?.name }}
  mate-button(:pub="user.pub")

  .p-1.m-1.rounded-full.transition-all.duration-300.ease-in-out(:style="{ backgroundColor: user.blink ? 'white' : 'black' }")
  .flex-1 
  button.gap-2.flex.flex-col.items-center.p-2.text-2xl(@click="user.db.get('safe').get('saved').put(!user.safe.saved)")
    .i-la-lock(v-if="user.safe.saved")
    .i-la-unlock(v-else)
    .text-xs Keys
  button.gap-2.flex.flex-col.items-center.p-2.text-2xl(@click="leave()")
    .i-ion-exit-outline
    .text-xs Logout
</template>