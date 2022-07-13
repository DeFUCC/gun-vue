<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const QrShow = defineAsyncComponent(() =>
  import('./QrShow.vue')
)

const state = reactive({
  data: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
  size: 200,
  margin: 6
})

async function generate() {
  const { SEA } = await import('#composables')
  state.data = (await SEA.pair()).pub
}


</script>

<template lang="pug">
Story(title="Qr/Show")
  Variant(title="Round")
    QrShow(v-bind="state")

  template(#controls)
    .p-2.flex.flex-col.gap-4
      .flex.gap-2
        label(for="size") Size
        input#size(
          type="range"
          v-model="state.size"
          :min="40"
          :max="500"
          )
      button.p-2.border-1.rounded-lg(@click="generate()") Generate Key Pair
</template>