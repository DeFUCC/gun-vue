<script setup>
import { ref, onMounted, computed } from 'vue'
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
import { safeHash, unsafeHash } from '@composables';

const open = ref(false)

onMounted(() => {
  open.value = true
})

const path = computed(() => {

  if (props.feed.length == 44) {
    let un = unsafeHash(props.feed)
    return un
  } else {
    return props.feed
  }
})
</script>

<template lang='pug'>
.p-2
  post-page.w-full(
    :key="path"
    :hash="path" 
    @close="$router.push('/posts/')" 
    @browse="$router.push(`/posts/${safeHash($event)}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" :key="$route.fullPath" )
</template>

<style scoped>
</style>