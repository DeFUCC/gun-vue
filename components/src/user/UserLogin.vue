<script setup>
import { ref } from 'vue'
const generate = ref(false)
</script>

<template lang='pug'>
.flex.flex-col.p-4
  button.text-xl.flex.justify-center.bg-light-900.hover_bg-light-50.p-4.rounded-2xl.shadow-lg.hover_shadow-xl.transition.duration-200.ease-out.font-bold(@click="generate = true" v-if="!generate") Create a new account
  .flex.justify-center.mt-4(v-if="!generate") or
  user-auth(v-if="!generate")
  user-create(v-else)
</template>