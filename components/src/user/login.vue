<script setup>
const generate = ref(false)
</script>

<template lang='pug'>
.flex.flex-col
  user-auth(v-if="!generate")
  user-create(v-else)
  button.button.text-xl.flex.justify-center(@click="generate = true" v-if="!generate") Generate a new account

</template>