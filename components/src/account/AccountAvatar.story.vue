<script setup>
import { defineAsyncComponent, reactive } from 'vue'

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
Story(
  title="Account/Avatar" 
  icon="la:user"
  )
  Variant(title="Round")
    AccountAvatar(v-bind="state")
  template(#controls)
    .p-2.flex.flex-col.gap-4
      .flex.gap-2
        label(for="size") Size
        input#size(
          v-model="state.size"
          type="range"
          :min="40"
          :max="500"
          )
      .flex.gap-2
        label(for="size") Border
        input#size(
          v-model="state.border"
          type="range"
          :min="0"
          :max="20"
          )
      button.p-2.border-1.rounded-lg(@click="generate()") Generate Key Pair
</template>