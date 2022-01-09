<script setup>
import { gun, safeHash, useTagPost } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const posts = reactive({})

gun.user(props.pub).get('feeds').map().once(function (list, tag) {

  this.map().on((d, k) => {
    if (!d) {
      delete posts?.[tag]?.[k]
    } else {
      posts[tag] = posts[tag] || {}
      posts[tag][k] = useTagPost(tag, k)
    }
  })
})

</script>

<template lang='pug'>
.flex.flex-col(v-if="Object.keys(posts).length > 0")
  h4.p-2.text-xl.mt-4.font-bold Starred posts
  .p-2(v-for="(feed,tag) in posts" :key="tag")
    transition-group(name="list")
      .text-lg.font-bold(v-if="Object.values(feed).length > 0") # {{ tag }}
      post-card.my-2(v-for="(post, hash) in feed" :key="hash" :post="post.data" :hash="hash"
        :tag="tag"
        :timestamp="post.timestamp"
        @click="$router.push(`/feeds/${tag}/${safeHash(hash)}`)"
        )

</template>