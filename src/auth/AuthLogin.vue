<script setup lang="ts">
import { AuthForm, AuthCreate } from '../components'
import { ref } from 'vue'
const generate = ref(false)


</script>

<template lang="pug">
.flex.flex-col
  transition(name="fade" mode="out-in")
    auth-form(v-if="!generate")
      button.w-full.text-xl.flex.justify-center.rounded-2xl.shadow-lg.hover-shadow-xl.transition.duration-200.ease-out.font-bold.p-4.bg-green-300.dark-bg-green-800(
      v-if="!generate" 
      @click="generate = true"
      ) Create a new account
    auth-create(v-else  @back="generate = false")
</template>