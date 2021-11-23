<script setup>
import { useRelay } from '@use/relay'

const relay = useRelay()

</script>

<template lang="pug">
.flex.items-center.p-4
  h1.font-bold RELAY pulse
  .p-4 {{ relay.pulse }}
</template>