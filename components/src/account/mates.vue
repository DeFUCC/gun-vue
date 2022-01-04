<script setup>
const props = defineProps({
  pub: { type: String, default: '' }
})

import { gun } from '@composables';

const links = ref({})

watchEffect(() => {
  gun.user(props.pub).get('mates').map().on((d, k) => {
    links.value[k] = d
  })
})

const mates = computed(() => {
  let obj = {}
  for (let link in links.value) {
    if (links.value[link]) {
      obj[link] = link
    }
  }
  return obj
})

</script>

<template lang='pug'>
.flex.flex-wrap
  transition-group(name="fade")
    account-badge(:pub="pub" v-for="pub in mates" :key="pub")
</template>