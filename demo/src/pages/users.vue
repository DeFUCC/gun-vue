<script setup>
import { ref } from 'vue'

const input = ref('public')
</script>

<template lang='pug'>
.flex.flex-col
  router-link.px-4.py-4.bg-light-900.font-bold(to="/users/") Public space users
  input(type="text" v-model="input")
  user-list(:space="input" @user="$router.push(`/users/${$event}`)" :key="input")
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component")
</template> 