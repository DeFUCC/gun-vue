<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const AccountAvatar = defineAsyncComponent(() =>
  import('./Avatar.vue')
)

const state = reactive({
  pub: "We2MxFrbFH37008fNmreSk9hdHLJNMVhrSMIIbOO5Ao.FbNrdt118-TCYzGYRo94Xa8EUWwwV-7DIopXSE9OZD8",
  size: 200
})

</script>

<template lang="pug">
Story(title="Account Avatar")
  Variant(title="Round")
    AccountAvatar(v-bind="state")
    template(#controls)
      .p-2
        .flex.gap-2
          label(for="size") Size
          input#size(
            type="range"
            v-model="state.size"
            :min="40"
            :max="500"
            )

</template>