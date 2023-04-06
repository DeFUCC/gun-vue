<script setup lang="ts">
import { useUser } from '#composables';
import { GiftWallets } from '../components'
const { user } = useUser()

</script>

<template lang='pug'>
.flex.flex-col
  .text-xl.p-4 My wallets
  gift-wallets(:pub="user.pub")
</template>