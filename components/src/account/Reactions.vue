<script setup>
import { useGun, currentRoom, isEmoji } from '@composables';
import { reactive, ref, computed } from 'vue'

const props = defineProps({
  pub: String,
})

const emit = defineEmits(['post'])

const open = reactive({})

const reactions = reactive({})

const currentReaction = ref()
const currentList = computed(() => {
  return reactions[currentReaction.value]
})

const gun = useGun()

gun.user(currentRoom.pub).get('links').map().on((d, k) => {
  let author = k.slice(90);
  let from = k.substring(0, 44)
  let to = k.substring(45, 89)
  if (author == props.pub) {

    if (d) {
      reactions[d] = reactions[d] || {}
      reactions[d][to] = from
    } else {
      delete reactions?.[d]?.[to]
    }

  }
})


</script>

<template lang='pug'>
.flex.flex-col
  .text-xl.font-bold.mb-2 Reactions
  .flex.flex-wrap.gap-4
    .p-2.flex.flex-wrap.bg-light-800.shadow-md.rounded-xl.gap-2
      transition-group(name="fade")
        .flex.py-2.items-center.cursor-pointer.bg-light-100.rounded-xl.shadow-lg.px-4(
          style="flex: 1 1 10px"
          :style="{ backgroundColor: currentReaction == reaction ? '#999' : '' }"
          v-for="(hashes, reaction) in reactions" :key="reaction"
          @click="currentReaction = reaction"
          )
          .text-4xl {{ isEmoji(reaction) ? reaction : '👋' }}
          .flex-1.w-4
          la-angle-up(v-if="currentReaction == reaction")
          la-angle-down(v-else)
          .text-lg.ml-1 {{ Object.keys(hashes).length }}
    transition(name="fade")
      .flex.flex-wrap.bg-light-800.rounded-2xl(v-if="currentReaction")
        transition-group(name="fade")
          post-card(
            style="flex: 1 1 100px"
            v-for="(from, hash) in currentList" :key="hash"
            :hash="hash"
            :tag="from"
            @click="$emit('post', hash)"
            :actions="false"
            )
</template>