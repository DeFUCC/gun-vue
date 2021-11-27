<script setup >
import { gunAvatar } from "gun-avatar"
const props = defineProps({
  pub: String,
  size: { type: Number, default: 40, },
});
const pic = ref("");
watchEffect(() => {
  if (props.pub && props.pub.includes(".") && props.size >= 10) {
    pic.value = gunAvatar(props.pub, 32);
  }
});
</script>

<template lang="pug">
.avatar.bg-local(
  v-if="pub",
  :title="pub",
  :style="{ background: `url(${pic})` }"
)
</template>

<style scoped>
.avatar {
  background-size: cover;
  width: 32px;
  height: 32px;
}
</style>