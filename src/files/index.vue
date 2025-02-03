<script setup>
import { useGun } from '../gun/useGun';
import { currentRoom } from '../room/useRoom';
import { useUser } from '../user/useUser';
import { reactive } from 'vue'
import { prettyBytes } from '../composables';
import { AccountAvatar } from '../all-components';
import TorrentUpload from './TorrentUpload.vue';

function addFile(data) {

  const gun = useGun()
  const { user } = useUser()
  if (!user.pub) return

  gun.user(currentRoom.pub).get('files').get(`${data.infoHash}@${user.pub}`).put(data, null, {
    opt: { cert: currentRoom.features?.files }
  })
}


const gun = useGun()
const { user } = useUser()

const files = reactive({})

gun.user(currentRoom.pub).get('files').map().on((d, k) => {
  if (d == null) return
  const infohash = k.slice(0, 40)
  const author = k.slice(-87)
  files[infohash] = files[infohash] ? { ...files[infohash], authors: { ...files[infohash].authors, [author]: true } } : { ...d, authors: { [author]: true } }
})

function removeFile(infoHash) {

  if (!user?.is?.pub) return

  gun.user(currentRoom.pub).get('files').get(`${infoHash}@${user?.is?.pub}`).put(null, null, {
    opt: { cert: currentRoom.features?.files }
  })
}
</script>

<template lang='pug'>
.p-4.flex.flex-col.gap-2
  torrent-upload(@uploaded="addFile($event)")
  .flex.flex-col.gap-2
    router-link.p-2.flex.flex-wrap.items-center.gap-2.break-all.bg-light-300.dark-bg-dark-400.rounded(
      v-for="(file, f) in files" :key="f"
      :to="`/files/${file.infoHash}`"
      )
      .text-sm {{ file?.name }}
      .text-8px.font-mono.flex-1.min-w-6 {{ file?.infoHash }}
      .text-md {{ prettyBytes(file?.length || 0) }}
      AccountAvatar(:pub="pub" :key="pub" :size="22" v-for="(author, pub) in file.authors" @click.stop.prevent="$router.push(`/users/${pub}`)")
      button(@click.stop.prevent="removeFile(file.infoHash)" aria-label="Remove the file from this room" v-if="file.authors[user?.is?.pub]")
        .i-la-trash-alt
</template>