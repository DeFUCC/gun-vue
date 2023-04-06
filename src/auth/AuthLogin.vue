<script setup lang="ts">
import { AuthForm, AuthCreate } from '../components'
import { ref } from 'vue'
const generate = ref(false)


</script>

<template lang="pug">
.flex.flex-col.p-4
  button.text-xl.flex.justify-center.bg-light-900.dark-bg-dark-200.hover-bg-light-50.hover-dark-bg-dark-600.p-4.rounded-2xl.shadow-lg.hover-shadow-xl.transition.duration-200.ease-out.font-bold(
    v-if="!generate" 
    @click="generate = true"
    ) Create a new account
  .flex.justify-center.mt-4(v-if="!generate") or
  auth-form(v-if="!generate")
  auth-create(v-else)
</template>