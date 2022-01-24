<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  url: { type: String, default: '' },
  icon: { type: [Boolean, String], default: true }
})

const valid = ref(false)

const domain = computed(() => {
  if (props.url) {
    try {
      let url = new URL(props.url)
      valid.value = url
      return url.hostname
    } catch {
      valid.value = null
      return 'incorrect link'
    }
  } else {
    return ''
  }
})

</script>

<template lang='pug'>
a.underline.flex.items-center.bg-light-300.rounded-xl.p-1.shadow-sm.hover_shadow-lg.transition.duration-200ms.hover_bg-light-5(:href="valid" v-if="domain"  target="_blank")
  .mr-1px.ml-8px {{ domain }}
  la-external-link-alt.mx-1
</template>