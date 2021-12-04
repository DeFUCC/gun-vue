<script setup>
import { usePass } from '@composables'
const { pass } = usePass()

</script>

<template lang='pug'>
.flex.flex-col
  .flex.flex-wrap.items-center.p-4.bg-light-900(v-if="pass.enc.pair") 
    la-asterisk.mr-4
    input(
      v-model="pass.input",
      type="password"
      :placeholder="`${pass.min} characters or more`"
    )
    button.p-2.mx-2.bg-light-100.rounded.shadow.cursor-pointer(
      @click="pass.set()",
      v-if="pass.input.length >= pass.min"
    ) Set
    .flex.p-2
      la-check.mr-2.text-green-600
      span Password is set
    .flex.items-center.p-2.mx-2.cursor-pointer.bg-light-100.rounded.shadow(@click="pass.show = !pass.show")
      la-eye
      .ml-2 Show
    .text-center.text-2xl(v-if="pass.show") {{ pass.dec.pass }}

</template>