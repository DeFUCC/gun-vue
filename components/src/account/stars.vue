<script setup>
import { reactive } from 'vue'
import { useGun, safeHash, usePost } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const emit = defineEmits(['feed'])

const posts = reactive({})

const gun = useGun()

gun.user(props.pub).get('feeds').map().once(function (list, tag) {

  this.map().on((d, k) => {
    if (!d) {
      delete posts?.[tag]?.[k]
    } else {
      posts[tag] = posts[tag] || {}
      let { post } = usePost({ tag, hash: k })
      posts[tag][k] = post
    }
  })
})

</script>

<template lang='pug'>
.flex.flex-col(v-if="Object.keys(posts).length > 0")
  .text-lg.ml-2.mb-2.font-bold Stars
  .p-2(v-for="(feed, tag) in posts" :key="tag")
    transition-group(name="list")
      .text-lg.font-bold.cursor-pointer(
        :key="tag"
        @click="$emit('feed', tag)" 
        v-if="Object.values(feed).length > 0"
        ) # {{ tag }}
    .flex.flex-wrap
      transition-group(name="list")
        post-card.my-2(
          v-for="(post, hash) in feed" 
          :key="hash" 
          :post="post?.data" 
          :hash="hash"
          :tag="tag"
          :timestamp="post.timestamp"
          @click="$emit('feed', `${tag}/${safeHash(hash)}`)"
          )

</template>