<script setup>
import { UserHome } from '../components'
</script>

<template lang="pug">
.flex.flex-col
  user-home(
    @room="$router.push(`/rooms/${$event}`)" 
    @user="$router.push(`/users/${$event}`)" 
    @chat="$router.push(`/private/${$event}`)"
    @post="$router.push(`/users/${$event}`)"
  )
  router-view(v-slot="{ Component }")
    transition(name="fade"  mode="out-in")
      component(:is="Component" )
</template>
