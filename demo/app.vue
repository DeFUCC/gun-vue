<script setup>
import { useDb } from '@gun-vue/composables'

useDb()
</script>

<template lang="pug">
nav-bar
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component")
</template>

<style>
</style>
