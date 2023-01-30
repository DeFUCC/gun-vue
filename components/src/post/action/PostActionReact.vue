<script setup>
import { useReaction, useUser, useColor, useReactions, countRating } from '#composables';
import { computed, ref } from 'vue'

const props = defineProps({
  authors: { type: Object, default: () => ({}) },
  hash: { type: String, default: '' },
  tag: { type: String, default: '' },
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

<template lang="pug">
.p-1.flex.flex-wrap.gap-2.items-center
  .p-2.font-bold {{ rating > 0 ? '+' : '' }}{{ rating }}
  post-reaction-button(
    :is-my="authors?.[user.pub]" 
    :reaction="reaction" 
    @react="react($event)"
    )

  transition-group(name="fade")
    .p-2px.flex.items-center.rounded-3xl.bg-light-500.gap-1(
      v-for="(list, emoji) in reactions" 
      :key="emoji" 
      @click.stop.prevent="react(emoji)"
      )
      .pl-2.text-xl(v-if="emoji !== 'true'") {{ emoji }}
      .font-bold.px-1(@click.stop.prevent="selected = selected ? null : emoji") {{ list.length }}

      transition-group(name="fade")
        template(v-if="4 > list.length || selected == emoji")
          account-badge.rounded-full.shadow-md.min-w-6(
            v-for="(author) in list" 
            v-show="author"
            :key="author"
            :size="20"
            :selectable="true"
            :pub="author" 
            :show-name="false"
            @click.stop.prevent="$emit('user', author)"
            )

</template>