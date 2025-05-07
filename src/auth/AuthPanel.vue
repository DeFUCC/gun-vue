<script setup lang="ts">
import { computed, ref } from 'vue'
import { UserAvatar } from '../components'
import { useUser, useBackground } from '#composables'
import AuthCredentials from '../auth/AuthCredentials.vue'

const { user, leave } = useUser()

const emit = defineEmits(['browse', 'safe', 'home'])

const bg = computed(() => useBackground({ pub: user.pub, size: 600, light: 0.5, draw: 'squares' }))

const keys = ref(false)

</script>

<template lang="pug">
.p-4.flex.items-center.w-full.flex-col.max-w-100.gap-2(
  v-if="user.is"
  :key="user.pub"
  :style="{ ...bg }"
  )
  user-avatar(:size="120" :editable="false")
  .text-xl.mx-2.font-bold {{ user?.name }}
  .p-1.m-1.rounded-full.transition-all.duration-300.ease-in-out(:style="{ backgroundColor: user.blink ? 'white' : 'black' }")
  .flex.justify-center
    button.gap-2.flex.flex-col.items-center.p-2.text-2xl(@click="emit('home')")
      .i-la-home
      .text-xs Home
    button.gap-2.flex.flex-col.items-center.p-2.text-2xl(@click="keys = !keys")
      .i-la-lock(v-if="!keys")
      .i-la-unlock(v-else)
      .text-xs Keys
    button.gap-2.flex.flex-col.items-center.p-2.text-2xl(@click="leave()")
      .i-ion-exit-outline
      .text-xs Logout

  AuthCredentials(v-if="keys" @close="keys = false")
</template>