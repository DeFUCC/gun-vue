<script setup>

const props = defineProps({
  pub: { type: String, default: '' }
})

import { ref } from 'vue'
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
.flex.items-center(v-if="user.is && user.pub != pub")
  button.button.text-3xl(@click="toggleMate()")
    la-user-plus(v-if="isMate")
    la-user(v-else)
    la-plus(v-if="!isMate")
    la-times(v-else)
</template>
