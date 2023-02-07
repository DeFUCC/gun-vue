
<script setup>
import { useRoom, rootRoom, currentRoom, useColor, useUser, useBackground, useMd } from '#composables';
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' },
  titles: {
    type: Object,
    default: () => ({
      space: 'Space',
      topics: 'Topics',
      posts: 'Posts',
      projects: 'Projects',
      gifts: 'Gifts',
      dict: 'Dictionary',
      users: 'Users',
      rooms: 'Rooms',

    })
  }
})

defineEmits(['rooms', 'browse'])

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
<!-- eslint-disable vue/no-v-html -->
<template lang="pug">
.flex.flex-col.items-stretch
  .pt-32.px-2.md-px-8.bg-cover.relative.flex.flex-col.items-center(:style="{ ...bg }") 
    .max-w-full.flex.flex-col.items-stretche.bg-light-100.bg-opacity-20.p-4.md-p-12.shadow-xl.backdrop-blur-md.backdrop-filter.rounded-t-xl
      .flex.flex-wrap.items-center.gap-8
        room-logo.flex-1.rounded-2xl.overflow-hidden.min-w-20(:pub="pub")
        .flex.flex-col.flex-auto(style="flex: 100")
          form-title.font-bold.text-2xl(
            :text="room.profile.name || roomPub.substring(0, 12)"
            :editable="room.hosts[user.pub] && roomPub == currentRoom.pub && !edit.name"
            @update="updateRoomProfile('name', $event)"
          )
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

          room-actions(:pub="roomPub")

  slot
  .flex.flex-col.items-center.bg-light-300

    .flex.flex-wrap.items-center.gap-2.p-4
      room-feature(
        v-for="(title, c) in titles" 
        :key="c"
        :cert="room.features[c]"
        :type="c"
        :title="title"
        :pub="pub || currentRoom.pub"
        :open="room.features[c] || (c == 'users' && room.features.space) || (c == 'topics' && room.features.chat)"
        @click="$emit('browse', c)" 
        )

    .max-w-200.relative
      .flex.items-center(v-if="edit.text === false" ) 
        .p-8.markdown-body(v-html="md.render(room.profile?.text || '')")
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
</template>