<script setup lang="ts">
import { useAuth } from '#composables'
const { pass } = useAuth();

const emit = defineEmits(['set'])

</script>

<template lang="pug">
form.flex.items-center.justify-center.gap-2.relative.flex-1(@submit.prevent.stop="pass.set(); emit('set')")
  input.p-4.rounded-xl.w-full.dark-bg-dark-700.text-center(
    v-model="pass.input",
    autocomplete="current-password" 
    :type="pass.show ? 'text' : 'password'"
    :placeholder="`Passphrase ${pass.minLength}+ letters`"
  )
  .ml-1.flex.flex-col.items-center.absolute.right-2
    .i-la-check.text-green-600.m-1(v-if="pass.safe?.enc")
  button.button.items-center(
    v-if="pass.input.length >= pass.minLength",
    type="submit"
    ) 
    .i-la-check
    .ml-2 Set
  //- button.button.items-center(
  //-   v-if="pass?.safe?.enc" 
  //-   @click="pass.show = !pass.show"
  //-   )
  //-   .i-la-eye
  //-   .ml-2 Show
</template>