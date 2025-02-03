<script setup>

import { useGun } from '../gun/useGun';
import { currentRoom } from '../room/useRoom';
import { useUser } from '../user/useUser';
import FileHash from './FileHash.vue';

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


  file-hash
</template>