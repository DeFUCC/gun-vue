<script setup>
import { useReaction, useUser, useColor, useReactions, countRating } from '@composables';
import { computed, ref } from 'vue'

const props = defineProps({
  authors: Object,
  hash: String,
  tag: String,
  back: Boolean
})

defineEmits(['react', 'user'])
const colorDeep = useColor('deep')

const { user } = useUser();

const { reaction, react } = useReaction({ ...props })

const reactions = computed(() => useReactions(props.authors))

const rating = computed(() => countRating(props.authors))

const selected = ref()
</script>

<template lang='pug'>
.p-1.flex.flex-wrap.gap-2.items-center
  .p-2.font-bold {{ rating > 0 ? '+' : '' }}{{ rating }}
  reaction-button(@react="react($event)" :isMy="authors?.[user.pub]" :reaction="reaction")

  transition-group(name="fade")
    .p-2px.flex.items-center.rounded-3xl.bg-light-500.gap-1(
      @click.stop.prevent="react(emoji)" 
      v-for="(list, emoji) in reactions" :key="emoji"
      )
      .pl-2.text-xl(v-if="emoji !== 'true'") {{ emoji }}
      .font-bold.px-1(@click.stop.prevent="selected = selected ? null : emoji") {{ list.length }}

      transition-group(name="fade")
        template(v-if="list.length < 4 || selected == emoji")
          account-badge.rounded-full.shadow-md.min-w-6(
            @click.stop.prevent="$emit('user', author)"
            v-for="(author) in list" :key="author"
            :size="20"
            :selectable="true"
            v-show="author"
            :pub="author" :showName="false"
            )

</template>