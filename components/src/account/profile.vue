<script setup>
import { useAccount } from '@composables'
import urlRegex from 'url-regex'

const props = defineProps({
  pub: { type: String, default: '' }
})

const { account } = useAccount(props.pub)

function isLink(text) {
  return urlRegex({ exact: true }).test(text)
}

</script>

<template lang='pug'>
.flex.flex-col.break-all
  .p-2.flex.items-center(
    v-for="(content, field) in account.profile" :key="field"
    )
    .mr-2.font-bold(style="flex: 1 1 20px") {{ field }}
    .flex.items-center.ml-1(style="flex: 1 1 220px")
      .p-0(v-if="!isLink(content)") {{ content }}
      a.font-bold.underline(v-else :href="content" target="_blank") {{ content }} 
</template>