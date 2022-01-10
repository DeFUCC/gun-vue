<script setup>
import { useUser } from '@composables';
import { ref } from 'vue'

useUser()
const open = ref(false)

</script>

<template lang='pug'>
.mx-2.text-xl.cursor-pointer(@click="open = true")
  account-avatar(:size="42" :border="2")
transition(name="fade")
  ui-modal(:open="open" @close="open=false")
    user-home
</template>