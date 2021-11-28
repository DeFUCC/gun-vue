<script setup>
import { useDb } from '@gun-vue/composables'

const { relay } = useDb()

</script>

<template lang="pug">
.flex.items-center.p-2
  .p-4.flex.items-center
    la-clock.mr-2
    span {{ relay.pulse }}
</template>

<style scoped>
</style>