<script setup>
const props = defineProps({
  pub: { type: String, default: '' }
})

import { gun, user } from '@composables';

const isMate = ref(false)

const dbMate = user.db.get('mates').get(props.pub)

dbMate.on(d => {
  isMate.value = d
})

function toggleMate() {
  dbMate.put(!isMate.value)
}


</script>

<template lang="pug">
.flex.flex-col
  .p-2 {{ isMate ? 'Mate' : 'Not mate' }}
  button.button(@click="toggleMate()") {{ isMate ? 'Unmate' : 'Mate' }}
</template>
