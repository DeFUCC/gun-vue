<script setup>
import { defineAsyncComponent } from 'vue'

const UserProfile = defineAsyncComponent(() => import('./UserProfile.vue'))

</script>

<template lang="pug">
Story(
  title="User/Profile" 
  icon="la:passport")
  Variant(title="Round")
    UserProfile

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>