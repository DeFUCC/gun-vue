<script setup >
import { useGun, useUser, gunAvatar, useColor } from '@composables'
import { computed, ref } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' },
  size: { type: Number, default: 42, },
  border: { type: Number, default: 2, },
});

const colorDeep = useColor('deep')

const gun = useGun()

const avatar = ref(gunAvatar({ pub: props.pub, size: props.size * 4 }))

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

gun.user(props.pub).get('pulse').on(d => {
  blink.value = !blink.value
})

</script>

<template lang="pug">
img.border.rounded-full.overflow-hidden.transition.duration-500.ease-out(
  :style="{ borderColor: blink ? colorDeep.hex(pub) : 'transparent', borderWidth: `${border}px` }"
  :title="pub",
  v-if="pub",
  :width="size"
  :src="avatar"
)
.p-2(v-else :style="{ fontSize: size + 'px' }")
  la-user
</template>
