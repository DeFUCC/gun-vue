<script setup>

import { useGun } from '../gun/useGun';
import { currentRoom } from '../room/useRoom';
import { useUser } from '../user/useUser';
import FileHash from './FileHash.vue';
import TorrentUpload from './TorrentUpload.vue';

function addFile(data) {

  const gun = useGun()
  const { user } = useUser()
  if (!user.pub) return

  gun.user(currentRoom.pub).get('files').get(`${data.infoHash}@${user.pub}`).put(data, null, {
    opt: { cert: currentRoom.features?.files }
  })
}

</script>

<template lang="pug">
.flex.flex-col(:key="currentRoom?.pub")
  router-link.p-2.font-bold.bg-light-800.dark-bg-dark-400(to="/files/") FILES
  router-view(v-slot="{ Component }")
    transition(
      name="fade" 
      mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")

  torrent-upload(@uploaded="addFile($event)")
  file-hash
</template>