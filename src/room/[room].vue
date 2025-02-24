<script setup>
import { RoomPage } from '../components'

const props = defineProps({
  room: { type: String, default: '' }
})


</script>

<template lang="pug">
room-page( 
  :pub="room"
  @browse="$router.push(`/${$event}/`)"
  @user="$router.push(`/users/${$event}/`)"
  ) 
</template>