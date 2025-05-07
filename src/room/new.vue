<script setup>
import RoomForm from './RoomForm.vue';
</script>

<template lang='pug'>
RoomForm(@room="$router.push(`/rooms/${$event}`)")
</template>