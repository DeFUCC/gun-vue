<script setup lang="ts">
import { useAvatar, useColor } from '../composables'

const props = defineProps({
  pub: { type: String, default: '' },
  size: { type: Number, default: 42, },
  border: { type: Number, default: 2, },
});

const colorDeep = useColor('deep')

const { avatar, blink } = useAvatar(() => props.pub, () => props.size)


</script>

<template lang="pug">
.flex.flex-col.items-center.justify-center
  img.border.rounded-full.overflow-hidden.transition.duration-500.ease-out(
    v-if="pub"
    :style="{ borderColor: blink ? colorDeep.hex(pub) : 'transparent', borderWidth: `${border}px` }",
    :width="size"
    :height="size"
    :src="avatar"
  )
  .pb-2.px-1(
    v-else
    :style="{ fontSize: size + 'px' }"
  )
    .i-la-user
  slot
</template>
