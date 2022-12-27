<script setup>
import { defineAsyncComponent, reactive } from 'vue'

const UserIcon = defineAsyncComponent(() =>
  import('./UserIcon.vue')
)

const state = reactive({
  size: 200,
})


</script>

<template lang="pug">
Story(
  title="User/Icon" 
  icon="la:user"
  )
  Variant(title="Round")
    UserIcon(v-bind="state")

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
</template>