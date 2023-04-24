<template lang="pug">
.row.gap-12.px-4.justify-between(ref="target")
  template(v-if="targetIsVisible || loaded")
    .flex-1.flex.items-center.justify-center(v-for="video in list", :key="video", )
      iframe.shadow-2xl.rounded-lg(
        loading="lazy"
        width="320", 
        height="200", 
        :src="`https://www.youtube.com/embed/${video}`", 
        title="YouTube video player", 
        frameborder="0", 
        allowfullscreen
        )
</template>

<script setup>
import { ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'

const target = ref(null)
const loaded = ref(false)
const targetIsVisible = useElementVisibility(target)

watch(targetIsVisible, t => {
  loaded.value = true
})

const props = defineProps({
  list: {
    type: Array,
    default: []
  }
});
</script>

<style scoped>
.row {
  @apply bg-dark-200;
}
</style>