<script setup>
import { dictRecord, selectedUser } from '#composables';
import { AccountAvatar } from '../../components'


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
    @click.stop.prevent="$emit(type, link)"
    )
      .p-1.rounded-full(
        v-for="(is, author) in authors" 
        :key="author" 
        ) 
        account-avatar(
          v-if="link == dictRecord.word || link == dictRecord.def" 
          :pub="author" 
          :size="20" 
          @click="selectedUser.pub = author"
          )
</template>