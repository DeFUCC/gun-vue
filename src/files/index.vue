<script setup>
import { useGun } from '../gun/useGun';
import { currentRoom } from '../room/useRoom';
import { reactive } from 'vue'

const gun = useGun()
const files = reactive({})
gun.user(currentRoom.pub).get('files').map().on((d, k) => {
  files[k] = d
})
</script>

<template lang='pug'>
p 
  h2.text-xl Files
  pre {{ files }}
</template>