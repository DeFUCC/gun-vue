<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps({
  feed: { type: String, default: 'feed' }
})
import { safeHash } from '@composables';

const open = ref(false)

onMounted(() => {
  open.value = true
})
</script>

<template lang='pug'>
.p-0
  ui-layer(:open="open" :closeButton="false"  @close="$router.push('/feeds/')")
    post-list.w-full(:tag="feed" :key="feed" @close="$router.push('/feeds/')" @browse="$router.push(`/feeds/${feed}/${safeHash($event)}`)")
  router-view(v-slot="{ Component }")
    transition(name="slide")
      component(:is="Component")
</template>

<style scoped>
</style>