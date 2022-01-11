<script setup>
import { ref } from 'vue'
import UiLayer from '../ui/layer.vue'
import PostList from '../post/list.vue'
import PostPage from '../post/page.vue'

let pathname = location.pathname != '/' ? location.pathname : ''
const url = ref(location.host + pathname)
const hash = ref(null)
</script>

<template lang='pug'>
.p-4 
  post-list.m-4(:tag="url" :key="url" @browse="hash = $event" @close="hash = null")
  ui-layer(:open="hash" @close="hash = null")
    post-page(:hash="hash" :tag="url" v-if="hash" :key="hash")
</template>