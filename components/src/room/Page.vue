<script setup>
import { useRoom, currentRoom, rootRoom, recreateRoom, useColor, useUser, useBackground, useMd } from '@composables';
import { ref, computed, reactive } from 'vue'

const props = defineProps({
  pub: String
})

defineEmits(['rooms'])

const { room, leaveRoom, updateRoomProfile, enterRoom } = useRoom(props.pub)

const { user } = useUser()

const roomPub = computed(() => {
  if (props.pub) {
    return props.pub
  } else {
    return currentRoom.pub
  }
})

const md = useMd()



const edit = reactive({
  name: false,
  description: false,
  text: false,
})

const colorDeep = useColor('deep')

const bg = computed(() => useBackground({ pub: roomPub.value, size: 1200, attachment: 'local' }))

</script>

<template lang='pug'>
.flex.flex-col.items-stretch
  .pt-32.px-2.md_px-8.bg-cover.relative.flex.flex-col.items-center(:style="{ ...bg }")
    .w-200.max-w-full.flex.flex-col.items-stretche.bg-light-100.bg-opacity-20.p-4.md_p-12.shadow-xl.backdrop-blur-md.backdrop-filter.rounded-t-xl
      .flex.flex-wrap.items-center
        .flex.flex-col
          form-title.font-bold.text-2xl(
            :text="room.profile.name || roomPub.substring(0, 12)"
            :editable="room.hosts[user.pub] && roomPub == currentRoom.pub && !edit.name"
            @update="updateRoomProfile('name', $event)"
          )
          .text-md {{ room.profile.description }}
          .flex.items-center.flex-wrap
            .font-bold.mr-2 Hosts: 
            .p-2(v-for="(enc, host) in room.hosts" :key="host")
              account-badge( :pub="host" :selectable="true")
              room-features(:features="enc") 🗝

        .flex-1
      room-features.my-4(:features="room.features")
      .flex.flex-wrap.items-center.gap-2
        button.button(v-if="room.hosts?.[user.pub]" @click="recreateRoom(room.hosts?.[user.pub]?.enc)")
          la-tools
          .ml-2 Renew
        .flex.flex-wrap.py-4(v-if="roomPub != rootRoom.pub")
          button.button(@click="enterRoom(roomPub)" v-if="currentRoom.pub !== roomPub")
            ion-enter-outline
            .ml-2 Enter
          button.button(@click="leaveRoom()" v-else)
            ion-exit-outline
            .ml-2 Leave
  .flex.flex-col.items-center.bg-light-300
    .max-w-200.relative
      .flex.items-center(v-if="edit.text === false" ) 
        .p-8.markdown-body(v-html="md.render(room.profile?.text || '')")
        button.button.absolute.top-4.right-4.z-200(@click="edit.text = room.profile?.text || ''" v-if="room.hosts?.[user.pub]")
          la-pen
      form-text(v-else v-model:text="edit.text" @close="updateRoomProfile('text', edit.text); edit.text = false")


</template>