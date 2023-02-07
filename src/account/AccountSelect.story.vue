<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const AccountSelect = defineAsyncComponent(() =>
  import('./AccountSelect.vue')
)

const state = reactive({
  pub: "",
})



</script>

<template lang="pug">
Story(
  title="Account/Select" 
  icon="la:list"
  )
  Variant(title="Round")
    AccountSelect(
      v-model:pub="state.pub" 
      @update:pub="hstEvent('update:pub', $event)"
      )

  template(#controls)
    .p-2.flex.flex-col.gap-4

</template>

<docs lang="md">
### Select a user among current room guests

</docs>