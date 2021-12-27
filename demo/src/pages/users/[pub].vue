<script setup>import { useAccount } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

const { account } = useAccount(toRefs(props).pub)
</script>

<template lang='pug'>
.flex.flex-col
  p {{ pub }}
  p {{ account }}
  account-profile(:pub="pub")
</template>