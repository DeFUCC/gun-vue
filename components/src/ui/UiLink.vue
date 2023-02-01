<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  url: { type: [String, Object], default: '' },
  icon: { type: [Boolean, String], default: true }
})

const valid = ref(false)

const domain = computed(() => {
  if (props.url) {
    try {
      let url = new URL(props.url)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      valid.value = url
      return url.hostname
    } catch {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      valid.value = null
      return 'incorrect link'
    }
  } else {
    return ''
  }
})

</script>

<template lang="pug">
a.underline.flex.items-center.bg-light-300.rounded-xl.p-1.shadow-sm.hover-shadow-lg.transition.duration-200ms.hover-bg-light-5(
  v-if="domain" 
  :href="valid" 
    target="_blank"
    )
  .mr-1px.ml-8px {{ domain }}
  .i-la-external-link-alt.mx-1
</template>