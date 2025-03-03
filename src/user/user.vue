<script setup>
import { selectedRoom, selectedUser } from '#composables';


</script>

<template lang='pug'>
UserHome(
  @chat="$router.push(`/messages/${$event}`)"
  @room="selectedRoom = $event"
  @user="selectedUser.pub = $event"
  )
</template>