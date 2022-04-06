<script setup>
import { useReaction, useUser, useColor, useReactions, countRating } from '@composables';
import { computed } from 'vue'

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
</script>

<template lang='pug'>
.p-1.flex.flex-wrap.gap-2.items-center
  .p-2.font-bold {{ rating > 0 ? '+' : '' }}{{ rating }}
  button.rounded-2xl.text-lg.bg-light-200.flex.items-center.pl-1.pr-1.mr-1(
    :style="{ backgroundColor: authors?.[user.pub] ? colorDeep.hex(user.pub) : '' }"
    v-if="user.pub"
    ) 
    //- account-avatar.rounded-full.shadow-md(:pub="user.pub" :size="32")
    .flex.items-center.px-2.py-1.text-xl(
      v-if="!authors?.[user.pub]"
      @click.stop.prevent="react('👍')" 
      )
      la-plus
    .flex.items-center(v-if="!authors?.[user.pub]")
      input.py-1.px-2.w-36px.rounded-xl.mx-1.text-center(v-model="reaction" @input="$event.target.value && react()" @click.stop.prevent v-if="!authors?.[user.pub]")

    .flex.items-center(v-else @click.stop.prevent="react()")
      .px-2.py-1.text-xl.w-36px {{ reaction }}
      la-times
    button.rounded-2xl.flex.items-center.pl-1.pr-1.mr-1(
      v-if="!authors?.[user.pub]"
      @click.stop.prevent="react('🗑')"
    )
      la-minus

  transition-group(name="fade")
    .p-2px.flex.flex-wrap.items-center.rounded-3xl.bg-light-500.gap-1(
      @click.stop.prevent="react(emoji)" 
      v-for="(list, emoji) in reactions" :key="emoji"
      )
      .px-2.text-xl(v-if="emoji !== 'true'") {{ emoji }}
      transition-group(name="list")
        account-badge.rounded-full.shadow-md(
          @click.stop.prevent="$emit('user', author)"
          v-for="(author) in list" :key="author"
          :size="20"
          :selectable="true"
          v-show="author"
          :pub="author" :showName="false"
          ) 
</template>