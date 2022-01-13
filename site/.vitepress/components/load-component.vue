<script setup>
// https://vitepress.vuejs.org/guide/using-vue.html#browser-api-access-restrictions
import { shallowRef, onMounted } from 'vue'

const props = defineProps({
  component: { type: String, default: 'FeedBlock' },
  pr: { type: Object, default: {} }
})

const comp = shallowRef(null)

onMounted(() => {
  import('@gun-vue/components').then(module => {
    comp.value = module?.[props.component]
  })
})
</script>

<template >
  <div>
    <Component v-if="comp" :is="comp" v-bind="pr"></Component>
  </div>
</template>