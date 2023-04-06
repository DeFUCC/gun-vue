<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColor, useMates, isEmoji, user } from '../composables';
import { MateLink } from '../components'

const props = defineProps({
  pub: { type: String, default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk' }
})

defineEmits(['browse'])

const mates = useMates(props.pub)

const open = ref(true)



</script>

<template lang="pug">
.flex.flex-col
  .flex.p-4.bg-light-900.dark-bg-dark-200.rounded-xl.mb-2.items-center.cursor-pointer.shadow-sm.hover-shadow-md.transition
    .text-lg.font-bold {{ pub == user.pub ? 'My mates' : "Mates" }}
    .flex-1
    .mr-2.font-bold {{ Object.keys(mates).length }}

  .flex.flex-wrap.bg-light-500.dark-bg-dark-200.rounded-xl.p-2
    transition-group(name="fade")
      mate-link(
        v-for="(link, linkPub) in mates" 
        :key="linkPub" 
        :emoji="link.emoji"
        :back="link.back"
        :to="linkPub"
        :from="pub"
        @click="$emit('browse', linkPub)"
      )
</template>