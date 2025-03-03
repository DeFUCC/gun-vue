<script setup>
import { useRoom, rootRoom, currentRoom, useColor, useUser, useBackground, useMd, favRoom } from '#composables';
import { ref, computed, reactive } from 'vue'
import { RoomLogo, FormTitle, AccountBadge, RoomActions, RoomFeature, FormText, GuestList } from '../components'
import { features } from '../../gun.config.json'

const props = defineProps({
  pub: { type: String, default: '' },
  titles: {
    type: Object,
    default: () => features
  }
})

const emit = defineEmits(['rooms', 'browse', 'user'])

const { user } = useUser()

const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return currentRoom.pub
  }
})

const { room, leaveRoom, updateRoomProfile, enterRoom } = useRoom(roomPub.value)

const md = useMd()

const edit = reactive({
  name: false,
  description: false,
  text: false,
})

const colorDeep = useColor('deep')

const bg = computed(() => useBackground({ pub: roomPub.value, size: 1200, attachment: 'local' }))


</script>

<template lang="pug">
.flex.flex-col.items-stretch
  .p-4.bg-cover.relative.flex.flex-col.items-center.w-full(:style="{ ...bg }") 
    .flex.flex-wrap.items-center.gap-8
      room-logo.flex-1.rounded-2xl.overflow-hidden.min-w-20(:pub="roomPub" :key="roomPub")
      .flex.flex-col.flex-auto(style="flex: 1 0 ")
        .flex.gap-2.items-center
          .font-bold.text-2xl {{ room.profile.name }}
          .flex-1 
          button.button.z-100(@pointerdown="favRoom(roomPub)" v-if="user?.is")
            .i-la-star(v-if="!room.isFavourite") 
            .i-la-star-solid(v-else)
        .text-md {{ room.profile.description }}
        .flex.items-center.flex-wrap
          .font-bold.mr-2 Hosts: 
          .p-2.flex.flex-col.items-start.gap-2(
            v-for="(enc, host) in room.hosts" 
            :key="host"
            )
            account-badge( 
              :pub="host" 
              :selectable="true"
              )

        room-actions(:pub="roomPub" @room="emit('browse', '')")

  slot
  .flex.flex-col.items-center.bg-light-300.dark-bg-dark-400
    .relative
      .flex.items-center
        .p-4.prose.max-w-65ch(v-html="md.render(room.profile?.text || '')")

    .px-4.max-w-55ch
      guest-list(state="offline" @user="$emit('user', $event)" :roomPub="room?.pub" :key="room.pub")
</template>