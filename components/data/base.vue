<script setup>
import { useRelay } from '@gun-vue/composables'

const relay = useRelay()

</script>

<template lang="pug">
.flex.items-center.p-4
  h1.font-bold RELAY pulse

  .p-4.flex.items-center
    la-clock.mx-2
    span {{ relay.pulse }}
</template>