<script setup>
import { useAccount } from '@composables'

const props = defineProps({
  pub: { type: String, default: '' }
})


const { account } = useAccount(props.pub)

</script>

<template lang='pug'>
.flex.flex-col
  .p-2.flex.items-center(
    v-for="(content,field) in account.profile" :key="field"
    )
    .mr-2.font-bold {{ field }}
    .flex.items-center.ml-1 {{ content }}
</template>