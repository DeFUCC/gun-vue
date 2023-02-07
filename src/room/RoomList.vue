<script setup>
import { useRooms } from '#composables';
import { reactive, ref, computed } from 'vue'

defineEmits(['browse'])

const { rooms } = useRooms()


</script>

<template lang="pug">
.flex.flex-col.mb-4 
  .flex.flex-wrap.gap-4.my-4
    room-form(@room="$emit('browse', $event)")
    room-card( 
      v-for="(authors, pub) in rooms"
      :key="pub" 
      style="flex: 1 1 200px"
      :pub="pub"
      @click="$emit('browse', pub)"
      )
      post-action-react(
        :authors="authors" 
        :hash="pub" 
        tag="rooms"
        )
  
</template> 