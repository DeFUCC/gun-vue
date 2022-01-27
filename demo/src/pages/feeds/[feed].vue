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
  post-list.w-full(
    :key="feed"
    :tag="path" 
    @close="$router.push('/feeds/')" 
    @browse="$router.push(`/feeds/${feed}/${safeHash($event)}`)"
    )
  router-view(v-slot="{ Component }")
    transition(name="fade")
      component(:is="Component" :key="$route.fullPath" )
</template>

<style scoped>
</style>