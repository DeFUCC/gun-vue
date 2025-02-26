<script setup>

import { currentRoom } from '#composables';
import { UserListOverlay, UserGraph } from '#components'
import { ref } from 'vue';
import UiLayer from '../ui/UiLayer.vue';
import AccountHome from '../account/AccountHome.vue';

const selectedUser = ref(null)

</script>

<template lang="pug">
.flex.flex-col.items-center
  user-list-overlay(
    :key="currentRoom.pub" 
    @user="selectedUser = $event")
  user-graph(
    :key="currentRoom.pub" 
    @user="selectedUser = $event"
    )
  UiLayer(:open="selectedUser" @close="selectedUser = null")
    AccountHome(
      :key="selectedUser"
      :pub="selectedUser"
      @browse="$router.push(`/users/${$event}`)"
      @post="$router.push(`/posts/${safeHash($event)}`)"
      @chat="$router.push(`/messages/${selectedUser}`)" 
      )
</template>