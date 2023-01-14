<script setup lang="ts">
import { useGun, gunAvatar, useColor } from '#composables'
import { ref, watch } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' },
  size: { type: Number, default: 42, },
  border: { type: Number, default: 2, },
});

const colorDeep = useColor('deep')

const gun = useGun()

const avatar = ref()

watch(() => props.pub, (p) => {
  avatar.value = gunAvatar({ pub: props.pub, size: props.size * 4 })
}, { immediate: true })

gun.user(props.pub).get('avatar').on(hash => {
  if (hash) {
    gun.get('#avatars').get(hash).once(d => {
      avatar.value = d
    })
  } else {
    avatar.value = gunAvatar({ pub: props.pub, size: props.size * 4 })
  }
})

const blink = ref()

gun.user(props.pub).get('pulse').on(() => {
  blink.value = !blink.value
})

</script>

<template lang="pug">
.flex.flex-col
  img.border.rounded-full.overflow-hidden.transition.duration-500.ease-out(
    v-if="pub"
    :style="{ borderColor: blink ? colorDeep.hex(pub) : 'transparent', borderWidth: `${border}px` }",
    :width="size"
    :height="size"
    :src="avatar"
  )
  .p-2(
    v-else
    :style="{ fontSize: size + 'px' }"
  )
    .i-la-user
  
</template>
