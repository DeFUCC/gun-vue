<script setup>
import { computed, ref } from 'vue'
import { useColor, useMates, isEmoji, user } from '@composables';

const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse'])

const colorDeep = useColor('pale')

const mates = useMates(props.pub)

const open = ref(true)

</script>

<template lang='pug'>
.flex.flex-col(v-if="Object.keys(mates).length > 0")
  .flex.p-4.bg-light-900.rounded-xl.mb-2.items-center.cursor-pointer.shadow-sm.hover_shadow-md.transition(@click="open = !open")
    .text-lg.font-bold {{ pub == user.pub ? 'My mates' : "Mates" }}
    .flex-1
    .mr-2.font-bold {{ Object.keys(mates).length }}
    la-angle-down(v-if="!open")
    la-angle-up(v-else)
  transition(name="fade")
    .flex.flex-wrap.bg-light-500.rounded-xl.p-2(v-if="open")
      transition-group(name="fade")
        account-mate-link(
          v-for="(link, linkPub) in mates" 
          :key="linkPub" 
          :emoji="link.emoji"
          :back="link.back"
          :to="linkPub"
          :from="pub"
          @click="$emit('browse', linkPub)"
        )
</template>