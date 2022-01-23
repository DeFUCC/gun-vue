<script setup>
import { gun } from '@composables';
import { reactive, computed } from 'vue'
const guests = reactive({})

gun.get('public').get('#guests').map().on((d, k) => {
  guests[k] = d
})

const count = computed(() => Object.keys(guests).length)

</script>

<template lang='pug'>
.flex.flex-col.items-center.my-4
  .text-xl.opacity-20 Select any of {{ count }} accounts to interact with

</template>