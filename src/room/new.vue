<script setup>
import { useUser } from '#composables';
import AuthLogin from '../auth/AuthLogin.vue';

const { user } = useUser()
</script>

<template lang='pug'>
AuthLogin(v-if="!user.is")
RoomForm(v-else @room="$router.push(`/rooms/${$event}`)")
</template>