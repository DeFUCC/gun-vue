<script setup lang="ts">
import { useUser } from '#composables';

const { user } = useUser()
</script>

<template lang='pug'>
.flex.flex-col
  .text-xl.p-4 My wallets
  gift-wallets(:pub="user.pub")
</template>

<route lang="yaml">
name: My wallets
meta:
  requiresAuth: true
</route>