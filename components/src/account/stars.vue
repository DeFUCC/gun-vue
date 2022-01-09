<script setup>
import { user } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const posts = reactive({})

user.db.get('feeds').map().once(function (list, tag) {
  posts[tag] = posts[tag] || {}
  this.map().on((d, k) => {
    if (!d) {
      delete posts[tag][k]
    } else {
      posts[tag][k] = d
    }

  })
})
</script>

<template lang='pug'>
.flex.flex-col
  h4.text-xl.mb-4 STARS 
  .p-2(v-for="(feed,tag) in posts" :key="tag") 
    .text-lg {{ tag }}
    .p-2(v-for="(starred, hash) in feed" :key="hash") {{ hash }}

</template>