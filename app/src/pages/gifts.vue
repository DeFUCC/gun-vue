<script setup>
import { useUser } from '#composables'
const { user } = useUser()
</script>

<template lang='pug'>
.p-2.flex.flex-col.gap-2
  router-link.text-xl.p-4.bg-gray-300(to="/gifts/") GIFTS
  .flex(v-if="user.is")
    router-link.button(to="/gifts/my") My gifts
    router-link.button(to="/gifts/add") Send gift
  router-view
</template>