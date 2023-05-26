<script setup>
import { useGun } from '../gun/useGun';
import { currentRoom } from '../room/useRoom';
import { reactive } from 'vue'
import { prettyBytes } from '../composables';
import { AccountAvatar } from '../all-components';

const gun = useGun()
const files = reactive({})
gun.user(currentRoom.pub).get('files').map().on((d, k) => {
  files[k] = d
})
</script>

<template lang='pug'>
.p-4
  .flex.flex-col.gap-2
    router-link.p-2.flex.flex-wrap.items-center.gap-2.break-all.bg-light-300.dark-bg-dark-400.rounded(
      v-for="file in files" :key="file"
      :to="`/files/${file.infoHash}`"
      )
      AccountAvatar(:pub="file?.author" :size="22")
      .text-md {{ file?.name }}
      .text-8px.font-mono.flex-1.min-w-6 {{ file?.infoHash }}
      .text-md {{ prettyBytes(file?.length) }}
      
</template>