<script setup>
import { ref } from 'vue'

const props = defineProps({
  host: { type: String, default: '' }
})

let pathname = location.pathname != '/' ? location.pathname : ''
const url = ref(location.host + pathname)
const hash = ref(null);
</script>

<template lang='pug'>
.p-0
  post-list.m-4(:tag="url" :host="host" :key="url" @browse="hash = $event" @close="hash = null")
  ui-layer(:open="hash" @close="hash = null")
    post-page(:hash="hash" :tag="url" v-if="hash" :key="hash")
</template>