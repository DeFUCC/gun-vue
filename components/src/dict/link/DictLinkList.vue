<script setup>
import { dictRecord, useColor, selectedUser } from '#composables';

const color = useColor('light')
const colorDeep = useColor('deep')

defineProps({
  links: { type: [Array, Object], default: () => [] },
  type: { type: String, default: 'def' },
  avatar: Boolean
})

defineEmits(['def', 'word'])

</script>

<template lang="pug">
.flex.flex-wrap.gap-1.m-1
  .p-2.rounded-xl.flex.gap-1.flex-wrap(
    v-for="(authors, link) in links" 
    :key="link"
    :style="{ backgroundColor: link == dictRecord.word || link == dictRecord.def ? colorDeep.hex(link) : color.hex(link) }"
    @click.stop.prevent="$emit(type, link)"
    )
      .p-1.rounded-full(
        v-for="(is, author) in authors" 
        :key="author" 
        :style="{ backgroundColor: colorDeep.hex(author) }"
        ) 
        account-avatar(
          v-if="link == dictRecord.word || link == dictRecord.def" 
          :pub="author" 
          :size="20" 
          @click="selectedUser.pub = author"
          )
</template>