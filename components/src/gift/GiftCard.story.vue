<script setup>
import { defineAsyncComponent, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { computedAsync } from '@vueuse/core'

const GiftCard = defineAsyncComponent(() =>
  import('./GiftCard.vue')
)

const gift = reactive({
  from: '',
  to: '',
  qn: 0,
  ql: '',
  wish: '',
  date: Date.now()
})

const hashed = ref()

const state = reactive({
  size: 40,
})

async function generate() {
  const { SEA } = await import('#composables')
  gift.from = (await SEA.pair()).pub
  gift.to = (await SEA.pair()).pub
}

onMounted(() => {
  generate()
})

watch(gift, async () => {
  const { hashObj } = await import('#composables')
  hashed.value = await hashObj(gift)
})


</script>

<template lang="pug">
Story(title="Gift/Card")
  Variant(title="Round")
    GiftCard(:gift="gift" :hash="hashed?.hash")
  template(#controls)
    .p-2.flex.flex-col.gap-4
      .flex.gap-2
        label(for="qn") Quantity
        input#qn(
          type="range"
          v-model="gift.qn"
          :min="1"
          :max="10000"
          )
      .flex.gap-2
        label(for="qn") Quality
        input#qn.flex-1.bg-transparent.shadow.border-1.rounded(
          type="text"
          v-model="gift.ql"
          )
      .flex.gap-2
        label(for="wish") Wish
        textarea#wish.flex-1.bg-transparent.shadow.border-1.rounded(
          v-model="gift.wish"
          )
      button.p-2.border-1.rounded-lg(@click="generate()") Generate Key Pairs
</template>