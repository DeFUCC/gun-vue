<script setup>
import { useUser } from '#composables';
import AuthLogin from '../auth/AuthLogin.vue';
import RoomForm from './RoomForm.vue';

const { user } = useUser()
</script>

<template lang='pug'>
AuthLogin(v-if="!user.is")
RoomForm(v-else @room="$router.push(`/rooms/${$event}`)")
</template>