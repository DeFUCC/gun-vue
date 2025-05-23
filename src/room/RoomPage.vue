<script setup>
import { useRoom, rootRoom, currentRoom, useUser, useBackground, useMd, favRoom } from '#composables';
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

defineEmits(['rooms', 'browse', 'user'])

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


const bg = computed(() => useBackground({ pub: roomPub.value, size: 1200, attachment: 'local' }))


</script>

<template lang="pug">
.flex.flex-col.items-stretch
  .pt-32.px-2.md-px-8.bg-cover.relative.flex.flex-col.items-center(:style="{ ...bg }") 
    .max-w-full.flex.flex-col.items-stretche.bg-light-100.bg-opacity-20.dark-bg-dark-800.dark-bg-opacity-40.p-4.md-p-12.shadow-xl.backdrop-blur-md.backdrop-filter.rounded-t-xl
      .flex.flex-wrap.items-center.gap-8 
        room-logo.flex-1.rounded-2xl.overflow-hidden.min-w-20(:pub="roomPub" :key="roomPub")
        .flex.flex-col.flex-auto(style="flex: 100")
          .flex.gap-2.items-center
            form-title.font-bold.text-2xl(
              :text="room.profile.name || roomPub.substring(0, 12)"
              :editable="room.hosts[user.pub] && roomPub == currentRoom.pub && !edit.name"
              @update="updateRoomProfile('name', $event)"
              )
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

          room-actions(:pub="roomPub" @room="$emit('browse', '/')")

  slot
  .flex.flex-col.items-center.bg-light-300.dark-bg-dark-400

    .flex.flex-wrap.items-center.gap-2.p-4
      room-feature(
        v-for="(title, c) in titles" 
        :key="c"
        :cert="room.features[c]"
        :type="c"
        :title="title"
        :pub="roomPub"
        :open="room.features[c] || (c == 'users' && room.features.space) || (c == 'chat' && room.features.chat)"
        @click="$emit('browse', c)" 
        )

    .relative
      .flex.items-center(v-if="edit.text === false" ) 
        .p-4.prose.max-w-65ch(v-html="md.render(room.profile?.text || '')")
        button.button.absolute.top-4.right-4.z-200(
          v-if="room.hosts?.[user.pub]" 
          @click="edit.text = room.profile?.text || ''"
          )
          .i-la-pen
      form-text(
        v-else 
        v-model:text="edit.text" 
        @close="updateRoomProfile('text', edit.text); edit.text = false"
        )

    .p-8
      guest-list(state="offline" @user="$emit('user', $event)" :roomPub="room?.pub" :key="room.pub")
</template>