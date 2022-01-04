<script setup>
import { gun } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const name = ref('')

watchEffect(() => {
  gun.user(props.pub).get('profile').get('name').on(d => {
    name.value = d
  })
})

</script>

<template lang='pug'>
.p-2.flex.items-center.rounded-3xl.bg-light-900.m-1
  account-avatar(:pub="pub" :size="30")
  .ml-2(v-if="name") {{ name }}
</template>