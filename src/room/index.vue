<script setup>
import { currentRoom, selectedRoom } from '#composables';
import { RoomList } from '../components'
</script>

<template lang="pug">
room-list.p-8(@browse="selectedRoom = $event" :key="currentRoom?.pub")
</template>