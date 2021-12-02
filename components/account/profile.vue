<script setup>
import { useAccount } from '@gun-vue/composables'

const account = useAccount()
</script>

<template lang='pug'>
.flex.p-4.m-4.shadow-md.bg-light-300 
  p {{ account }}
</template>