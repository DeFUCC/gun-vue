<script setup>
import { selectedRoom, selectedUser } from '#composables';
import { UserHome } from '../components'
</script>

<template lang="pug">
.flex.flex-col
  UserHome(
    @room="selectedRoom = $event" 
    @user="selectedUser.pub = $event" 
    @chat="$router.push(`/messages/${$event}`)"
  )
  router-view(v-slot="{ Component }")
    transition(name="fade"  mode="out-in")
      component(:is="Component" )
</template>
