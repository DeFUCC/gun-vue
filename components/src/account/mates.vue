<script setup>

const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse'])

import { useColor, useMates } from '@composables';

const colorDeep = useColor('deep')

const mates = useMates(props.pub)

function isEmoji(text) {
  return /\p{Extended_Pictographic}/u.test(text)
}


</script>

<template lang='pug'>
.flex.flex-wrap
  transition-group(name="fade")
    .flex.items-center.rounded-full.m-1.shadow-md.hover_shadow-lg.transition.duration-100ms.ease-out.filter.grayscale-60.hover_grayscale-0(v-for="(link, linkPub) in mates" :key="linkPub" :style="{ backgroundColor: colorDeep.hex(pub) }")
      .pr-2.pl-4.text-2xl(v-if="isEmoji(link.emoji)") {{ link.emoji }}
      account-badge(:pub="linkPub"  @click="$emit('browse', linkPub)")
        .pr-2.text-xl(v-if="link.back") {{ link.back }}
</template>