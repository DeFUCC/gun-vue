<script setup>
import { components } from '#components'

const emit = defineEmits(['component'])
</script>

<template lang='pug'>
.flex.flex-wrap
  .cursor-pointer.p-1.opacity-60.hover-opacity-100(
    v-for="(component, name ) in components"
    @click="$emit('component', name)"
    ) {{ name }}
</template>