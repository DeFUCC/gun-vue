<script setup>
import { useUser } from '#composables';

const { user } = useUser()
</script>

<template lang="pug">
.p-4(v-if="user?.pub") 
  .text-2xl You've successfully logged in as 
    span.font-bold {{ user.name }}
  router-link(to="/my/") Go to your profile
.p-4(v-else)
  user-auth
</template>

<route lang="yaml">
name: Auth page
</route>