<script setup>
import { ref, computed } from 'vue'
import { gun, ms } from '@composables';

const props = defineProps({
  tag: { type: String, default: 'posts' },
  hash: { type: String, default: '' }
})

const timestamp = ref(0)

const msTime = computed(() => ms(Date.now() - timestamp.value || 1000))

gun
  .get(`#${props.tag}`)
  .get(props.hash)
  .on(function (d, k, g) {
    timestamp.value = g.put['>']
  })


async function refreshPost(tag = 'posts', hash) {
  let data = await gun.get(`#${tag}`).get(hash).then();
  gun.get(`#${tag}`).get(hash).put(data);
}

</script>

<template lang='pug'>
button.m-1.button.items-center(@click.stop.prevent="refreshPost(tag, hash)")
  .num.p-0.mr-1.text-sm {{ msTime }}
  mdi-watering-can-outline
</template>

<style scoped>
.num {
  font-variant-numeric: tabular-nums;
}
</style>