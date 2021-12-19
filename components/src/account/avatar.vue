<script setup >
import { gunAvatar } from "gun-avatar"
import { account } from '@composables'
const props = defineProps({
  size: { type: Number, default: 40, },
});
const pic = ref("");
watchEffect(() => {
  if (account.pub && account.pub.includes(".") && props.size >= 10) {
    pic.value = gunAvatar(account.pub, 32);
  }
});
</script>

<template lang="pug">
.avatar.bg-local.rounded-full.overflow-hidden(
  v-if="account.pub",
  :title="account.pub",
  :style="{ background: `url(${pic})` }"
)
.p-0(v-else)
  la-user
</template>

<style scoped>
.avatar {
  background-size: cover;
  width: 32px;
  height: 32px;
}
</style>