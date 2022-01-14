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
  <div class="comp">
    <Component v-if="comp" :is="comp" v-bind="pr"></Component>
  </div>
</template>

<style scoped>
.comp {
  margin: 1em;
  border: 1px dotted purple;
  border-radius: 6px;
}
</style>