<script setup lang="ts">
import { AuthForm } from '../components'
import { ref } from 'vue'
import { useGun } from '#composables';

const gun = useGun()
</script>

<template lang="pug">
auth-form(@auth="gun.user().auth($event)")    
</template>