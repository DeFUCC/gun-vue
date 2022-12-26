<script setup>
import { useUser } from '#composables'
const { user } = useUser()
</script>

<template lang="pug">
.p-2.flex.flex-col.gap-2
  .flex.w-full.bg-gray-300.p-2.rounded-xl.gap-2
    router-link.flex-auto.text-xl.p-4(to="/gifts/") GIFTS
    router-link.button(to="/gifts/my") My gifts
    router-link.button(to="/gifts/add") Send gift
  router-view
</template>