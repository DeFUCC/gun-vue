<script setup>
import { ref, watchEffect } from 'vue'
import { useGun, useColor } from '@composables'

const props = defineProps({
  pub: { type: String, default: '' }
})

const name = ref('')

const colorDeep = useColor('deep')

const gun = useGun()

watchEffect(() => {
  gun.user(props.pub).get('profile').get('name').on(d => {
    name.value = d
  })
});

</script>

<template lang="pug">
.p-1.flex.items-center.rounded-3xl.bg-light-900.cursor-pointer.shadow(:style="{ backgroundColor: colorDeep.hex(pub) }")
  account-avatar(:pub="pub" :size="30")
  .mx-2.font-bold.text-sm(v-if="name") {{ name }}
  slot
</template>