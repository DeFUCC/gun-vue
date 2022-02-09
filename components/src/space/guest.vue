<script setup>
import { useColor, gunAvatar, useGun } from '@composables';
import { computed, ref } from 'vue'
const props = defineProps(
  {
    pub: { type: String, default: '' },
    pos: { type: Object, default: { x: 0, y: 0 } },
    pulse: { type: Number, default: 0 },
    blink: { type: Boolean, default: false },
    size: { type: Number, default: 100 }
  })

const TIMEOUT = 10000

const age = computed(() => Date.now() - Number(props.pulse))

const isOffline = computed(() => age > TIMEOUT)

const colorDeep = useColor()
const color = computed(() => colorDeep.hex(props.pub))

const avatar = ref(gunAvatar({ pub: props.pub, size: props.size * 4 }))

const gun = useGun()

gun.user(props.pub).get('avatar').on(hash => {
  if (hash) {
    gun.get('#avatars').get(hash).on(d => {
      avatar.value = d
    })
  } else {
    avatar.value = gunAvatar({ pub: props.pub, size: props.size * 4 })
  }
})
</script>

<template lang='pug'>
g.guest(
  :opacity="isOffline ? 0.1 : 1"
)
  circle.transition.duration-1000.ease-out(
    style="filter:url(#shadowButton)"
    :r="26"
    :fill="color"
    stroke-width="8"
    stroke-opacity="0.5"
    :stroke="blink ? color : 'transparent'"
  )
  image(:xlink:href="avatar" x="-25" y="-25" height="50" width="50" clip-path="url(#mask)")
</template>