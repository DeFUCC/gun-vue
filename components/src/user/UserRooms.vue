<script setup>
import { computed, ref } from 'vue'
import { useUser, createRoom, SEA, enterRoom, recreateRoom } from '#composables';

const emit = defineEmits(['browse'])

const { user } = useUser()

const rooms = computed(() => {
  let list = user.safe.rooms
  if (list) {
    delete list['_']
    return list
  } else {
    return {}
  }

})

const open = ref(false)


</script>

<template lang="pug">
.flex.flex-col(v-if="Object.keys(rooms).length > 0")
  .flex.p-4.bg-light-900.rounded-xl.mb-2.items-center.cursor-pointer.shadow-sm.hover-shadow-md.transition(@click="open = !open")
    .text-lg.font-bold My rooms
    .flex-1 
    .text-md.font-bold.mr-2 {{ Object.keys(rooms).length }}
    .i-la-angle-down(v-if="!open")
    .i-la-angle-up(v-else)
  transition(
    name="fade" 
    mode="out-in")
    .flex.flex-wrap.gap-2.mb-8(v-if="open" )
      room-card(
        v-for="( enc, room ) in rooms" 
        :key="room" 
        style="flex: 1 1 200px"
        :pub="room"
        )
          .p-4.flex.flex-wrap.gap-1
            button.button(@click="$emit('browse', room)")
              .i-la-eye
              .ml-2 View
            button.button(@click="enterRoom(room)")
              .i-ion-enter-outline
              .ml-2 Enter
            button.button(@click="recreateRoom(enc)")
              .i-la-tools
              .ml-2 Renew
</template>