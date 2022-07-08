<script setup>
import { isEmoji, useColor } from '@composables';
import { computed } from 'vue';

const colorDeep = useColor('deep')

const props = defineProps({
  emoji: String,
  from: String,
  to: String,
  back: String,
})

</script>

<template lang='pug'>
.flex.cursor-pointer.items-center.rounded-full.m-1.shadow-sm.hover_shadow-md.transition.duration-200ms.ease-out.filter.grayscale-10.hover_grayscale-0.justify-between(
  :style="{ backgroundColor: colorDeep.hex(from) + '33' }"
  ) 
  .px-2.text-2xl(
    v-if="isEmoji(emoji)"
    ) {{ emoji }}
  account-badge.shadow-md(
    :selectable="true"
    :pub="to"  
    )
    .pr-2.text-xl(v-if="back") {{ back }}
</template>