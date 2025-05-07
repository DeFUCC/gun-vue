<script setup>
import { computed } from 'vue'
import { usePosts, usePost, useMd } from '#composables';
import { PostLine, EmbedYoutube, UiLink, QrShare, PostActionUpdate, PostList } from '../components'


const md = useMd()

const props = defineProps({
  tag: { type: String, default: '' },
  hash: { type: String, default: '' },
})

defineEmits(['close', 'browse', 'user'])


const { post, download, downloading, } = usePost({ hash: props.hash })

const { posts, backlinks } = usePosts(props.hash)

</script>
<template lang="pug">
.rounded-lg.max-w-65ch.flex.flex-col.items-stretch.justify-center.w-full.overscroll-contain.bg-light-200.dark-bg-dark-500
  .flex.flex-wrap 
    post-line(
      v-for="(authors, ahash) in backlinks"
      :key="ahash" 
      style="flex: 1 1 220px" 
      :hash="ahash"
      :tag="tag"
      :authors="authors"
      :back="true"
      @user="$emit('user', $event)"
      @click="$emit('browse', ahash)"
      )

  .z-30.flex.flex-wrap.items-center.w-full.px-4.py-2.sticky.top-0.shadow-xl.filter.grayscale-70.hover-grayscale-0.transition.duration-400ms
    .hover-underline.text-md.cursor-pointer.font-bold.flex(@click="$emit('close')") 
      .p-0 #
    .ml-1.break-all.font-bold {{ post?.title }} 
    .flex-1 
    button.p-2( @click="$router.back()") 
      .i-la-angle-left
    button.p-2( @click="$emit('close')") 
      .i-la-times



  .flex-1.flex.flex-col.items-stretch(style="flex: 10 1 300px")
    .z-1.max-w-100vw(

      v-if="post?.cover || post?.youtube || post?.text"
      )
      img.sticky.top-0(:src="post.cover")
    .flex.flex-wrap.items-start.w-full.justify-start(
      )
      .w-full.flex.flex-col.items-stretch
        .p-2
          img.w-20.h-20.rounded-full.m-2(
            v-if="post.icon"
            style="flex:0 1 40px" 
            :src="post.icon" 
            :style="{ borderColor: 'white' }"
            )
          .text-2xl.font-bold.m-2(

            v-if="post?.title"
            ) {{ post?.title }}
          ui-link(
            v-if="post?.link" 
            :url="post?.link"
            )
          .m-2(v-if="post?.statement") {{ post?.statement }} 
        .flex-auto
        .flex.flex-wrap.p-4.bg-dark-50.bg-opacity-25.dark-bg-dark-400.w-full.items-center.gap-1.text-sm
          post-action-update(:hash="hash" )
          button.button.flex.items-center(@click="download()")
            .i-la-file-download(v-if="!downloading")
            .i-la-redo-alt.animate-spin(v-else)
    embed-youtube.mb-6.shadow-xl.flex-1(
      v-if="post?.youtube" 
      :video="post?.youtube"
      )
    .text-md.markdown-body.m-1.px-4.py-4.leading-relaxed(
      v-if="post?.text" 
      v-html="md.render(post?.text)"
      )

    post-list(
      :key="tag" 
      :tag="hash" 
      :header="false" 
      @browse="$emit('browse', $event)"
      )

</template>
