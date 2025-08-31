<script setup>
import { useCall } from './useCall.js'

const state = useCall()


</script>

<template lang="pug">
.flex.flex-col
  router-link.p-2.font-bold.bg-light-800.dark-bg-dark-400(to="/call/") Gun-Vue-CALL
  router-view(v-slot="{ Component }")
    transition(name="fade" mode="out-in")
      keep-alive
        component.flex-auto(:is="Component")
</template>