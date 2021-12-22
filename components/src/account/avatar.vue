<script setup >
import { account, gunAvatar, color } from '@composables'
const props = defineProps({
  size: { type: Number, default: 42, },
  border: { type: Number, default: 2, },
});
</script>

<template lang="pug">
.avatar(
)
  img.border.rounded-full.overflow-hidden.transition-all.duration-500.ease-out(
    :style="{ borderColor: account.blink ? color.deep.hex(account.pub) : 'transparent', borderWidth: `${border}px` }"
    :title="account.pub",
    v-if="account.pub",
    :src="gunAvatar(account.pub, size)"
  )
  .p-2(v-else)
    la-user
</template>
