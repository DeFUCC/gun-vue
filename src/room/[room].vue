<script setup>
import { selectedUser, useUser } from '#composables';
import { RoomPage } from '../components'

const props = defineProps({
  room: { type: String, default: '' }
})

const { user } = useUser()


</script>

<template lang="pug">
room-page( 
  :pub="room"
  :key="user"
  @browse="$router.push(`/${$event}/`)"
  @user="selectedUser.pub = $event"
  ) 
</template>