<template lang="pug">
.avatar(
  v-if="pub",
  :title="pub",
)
  img.avatar.rounded-full(
    v-if="pic",
    :src="pic",
    :title="pub",
    :width="size",
    :height="size",
  )
</template>

<script setup >
import { gunAvatar } from "gun-avatar"
const props = defineProps({
  pub: String,
  size: { type: Number, default: 400, },
});
const pic = ref("");
watchEffect(() => {
  if (props.pub && props.pub.includes(".") && props.size >= 10) {
    pic.value = gunAvatar(props.pub, props.size);
  }
});
</script>

<style scoped>
.avatar {
  min-width: 0.5rem;
  min-height: 0.5rem;
}
</style>