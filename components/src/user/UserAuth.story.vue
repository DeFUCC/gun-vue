<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserAuth = defineAsyncComponent(() =>
  import('./UserAuth.vue')
)

const state = reactive({
  pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
})

async function generate() {
  const { SEA } = await import('#composables')
  const pair = await SEA.pair()
  state.pub = pair.pub
}

</script>

<template lang="pug">
Story(title="User/Auth" icon="la:key")
  Variant(title="Round")
    UserAuth(v-bind="state")

  template(#controls)
    .p-2.flex.flex-col.gap-4
      button.p-2.border-1.rounded-lg(@click="generate()") Generate Key Pair
</template>