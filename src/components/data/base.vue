<script setup>
import { useRelay } from '@use/relay'

const relay = useRelay()

</script>

<template lang="pug">
.flex.flex-col.items-center
  h1 DB
  p {{ relay.pulse }}
</template>