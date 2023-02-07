<script setup lang="ts">
import { useAccount } from '../composables'
import urlRegex from 'url-regex'

const props = defineProps({
  pub: { type: String, default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk' }
})

const { account } = useAccount(props.pub)

function isLink(text: string): boolean {
  return urlRegex({ exact: true }).test(text)
}

</script>

<template lang="pug">
.flex.flex-col.break-all
  .p-2.flex.items-center(
    v-for="(content, field) in account.profile" 
    :key="field"
    )
    .mr-2.font-bold(style="flex: 1 1 60px") {{ field }}
    .flex.items-center.ml-1(style="flex: 1 1 180px")
      .p-0(v-if="!isLink(content)") {{ content }}
      a.font-bold.underline(
        v-else 
        :href="content" 
        target="_blank"
        ) {{ content }} 
</template>
