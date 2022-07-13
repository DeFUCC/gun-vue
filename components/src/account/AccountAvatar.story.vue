<script setup>
import { defineAsyncComponent, onMounted, reactive } from 'vue'

const AccountAvatar = defineAsyncComponent(() =>
  import('./AccountAvatar.vue')
)

const state = reactive({
  pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
  size: 200,
  border: 2
})

async function generate() {
  const { SEA } = await import('#composables')
  const pair = await SEA.pair()
  state.pub = pair.pub
}


</script>

<template lang="pug">
Story(title="Account/Avatar")
  Variant(title="Round")
    AccountAvatar(v-bind="state")
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
      .flex.gap-2
        label(for="size") Border
        input#size(
          type="range"
          v-model="state.border"
          :min="0"
          :max="20"
          )
      button.p-2.border-1.rounded-lg(@click="generate()") Generate Key Pair
</template>