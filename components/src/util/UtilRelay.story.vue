<script setup>
import { defineAsyncComponent } from 'vue'

const UtilRelay = defineAsyncComponent(() =>
  import('./UtilRelay.vue')
)

</script>

<template lang="pug">
Story(title="Util/Relay")
  Variant(title="Round")
    UtilRelay(v-bind="state")

</template>