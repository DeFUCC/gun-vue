<script setup>

import { currentRoom, selectedUser } from '#composables';
import { UserListOverlay, UserGraph } from '#components'
import { ref } from 'vue';
import UiLayer from '../ui/UiLayer.vue';
import AccountHome from '../account/AccountHome.vue';

</script>

<template lang="pug">
.flex.flex-col.items-center
  user-list-overlay(
    :key="currentRoom.pub" 
    @user="selectedUser.pub = $event")
  user-graph(
    :key="currentRoom.pub" 
    @user="selectedUser.pub = $event"
    )
</template>