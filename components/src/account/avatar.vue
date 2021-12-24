<script setup >
import { account, gunAvatar, color } from '@composables'
const props = defineProps({
  pub: { type: String, default: '' },
  size: { type: Number, default: 42, },
  border: { type: Number, default: 2, },
});

const pubKey = computed(() => props.pub || account.pub)
</script>

<template lang="pug">
img.border.rounded-full.overflow-hidden.transition-all.duration-500.ease-out(
  :style="{ borderColor: pubKey == account.pub && account.blink ? color.deep.hex(account.pub) : 'transparent', borderWidth: `${border}px` }"
  :title="pubKey",
  v-if="pubKey",
  :width="size"
  :src="gunAvatar(pubKey, size * 4)"
)
.p-2(v-else)
  la-user
</template>
