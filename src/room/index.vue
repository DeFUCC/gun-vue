<script setup>
import { currentRoom } from '#composables';
import { RoomList } from '../components'
</script>

<template lang="pug">
room-list.p-8(@browse="$router.push(`/rooms/${$event}`)" :key="currentRoom?.pub")
</template>