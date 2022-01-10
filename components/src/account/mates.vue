<script setup>
const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse'])
import { ref, watch, computed } from 'vue'
import { useGun } from '@composables';

const links = ref({})

const gun = useGun()

watch(() => props.pub, (pub) => {
  links.value = {}
  gun.user(pub).get('mates').map().on((d, k) => {
    links.value[k] = d
  })
}, {
  immediate: true
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
    account-badge(:pub="pub" v-for="pub in mates" :key="pub" @click="$emit('browse', pub)")
</template>