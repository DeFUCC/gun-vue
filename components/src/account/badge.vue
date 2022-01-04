<script setup>
import { gun, color } from '@composables';

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
.p-1.flex.items-center.rounded-3xl.bg-light-900.m-1.cursor-pointer.shadow(:style="{ backgroundColor: color.deep.hex(pub) }")
  account-avatar(:pub="pub" :size="30")
  .mx-2.font-bold.text-sm(v-if="name") {{ name }}
</template>