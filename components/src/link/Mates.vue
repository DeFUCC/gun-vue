<script setup>

const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse'])

import { useColor, useMates, isEmoji } from '@composables';

const colorDeep = useColor('pale')

const mates = useMates(props.pub)

</script>

<template lang='pug'>
.flex.flex-col
  .text-lg.ml-2.mb-2.font-bold(v-if="Object.keys(mates).length > 0") Mates
  .flex.flex-wrap(v-if="Object.keys(mates).length > 0")
    transition-group(name="fade")
      .flex.items-center.rounded-full.m-1.shadow-sm.hover_shadow-md.transition.duration-200ms.ease-out.filter.grayscale-10.hover_grayscale-0(
        v-for="(link, linkPub) in mates" 
        :key="linkPub" 
        :style="{ backgroundColor: colorDeep.hex(pub) }"
        )
        .px-2.text-2xl(
          v-if="isEmoji(link.emoji)"
          ) {{ link.emoji }}
        account-badge.shadow-md(
          :pub="linkPub"  
          @click="$emit('browse', linkPub)"
          )
          .pr-2.text-xl(v-if="link.back") {{ link.back }}
</template>