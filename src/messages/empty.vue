<script setup>
import { useUser } from '#composables';
import MessageExchange from './MessageExchange.vue';

const { user } = useUser()
</script>

<template lang="pug">
MessageExchange(
  :pub="user.pub" 
  )
</template>
