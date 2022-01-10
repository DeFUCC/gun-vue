<script setup >
import { user, gunAvatar, useColor } from '@composables'
import { computed } from 'vue'

const props = defineProps({
  pub: { type: String, default: '' },
  size: { type: Number, default: 42, },
  border: { type: Number, default: 2, },
});

const colorDeep = useColor('deep')

const pubKey = computed(() => props.pub || user.pub)
</script>

<template lang="pug">
img.border.rounded-full.overflow-hidden.transition.duration-500.ease-out(
  :style="{ borderColor: pubKey == user.pub && user.blink ? colorDeep.hex(user.pub) : 'transparent', borderWidth: `${border}px` }"
  :title="pubKey",
  v-if="pubKey",
  :width="size"
  :src="gunAvatar(pubKey, size * 4)"
)
.p-2(v-else)
  la-user
</template>
