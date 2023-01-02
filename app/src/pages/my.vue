<script setup>
import { useUser } from '#composables'

const { user } = useUser()
</script>

<template lang="pug">
.flex.flex-col
  router-link.py-2.px-4.font-bold.bg-light-900(
    v-if="$route.path != '/my/'" 
    to="/my/") My page
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" )
</template>