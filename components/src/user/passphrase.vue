<script setup>
import { usePassphrase } from '@composables'
const { pass } = usePassphrase()

</script>

<template lang='pug'>

.flex.items-center.px-4
  la-asterisk
  .mx-2(v-if="pass.safe?.enc")
    la-check.text-green-600
  input(
    v-model="pass.input",
    :type="pass.show ? 'text' : 'password'"
    :placeholder="`Enter a passphrase`"
  )
  button.button(
    @click="pass.set()",
    v-if="pass.input.length >= pass.minLength"
  ) Set
  button.button(@click="pass.show = !pass.show")
    la-eye
</template>