<script setup>
import { useGuests, useNewGift, useUser, useProject } from '#composables'
import ProjectCard from '../project/ProjectCard.vue';

const props = defineProps({
  gift: {
    type: Object,
    default: {
      project: '',
      from: '',
      to: '',
      qn: 0,
      ql: ''
    }
  }
})

const { user } = useUser()

const { gift, propose } = useNewGift(props.gift)

const { guests, count } = useGuests()

const emit = defineEmits(['sent'])

const { project } = useProject(props.gift?.project)

</script>

<template lang='pug'>
.flex

  .w-160px.p-4.text-center
    user-icon.pointer-events-none(:size="150")
    .text-lg {{ user.name }}
  .flex-1
    .font-mono.text-sm.m-4.opacity-50.break-all {{ gift }}
    .p-4
      account-badge(:pub="gift.to" v-if="gift.to")
        .flex-1
        la-times.mr-2(@click="gift.to = ''")
      .flex.flex-col(v-else)
        .font-bold USER SELECT OF {{ count.total }}

        .flex.flex-wrap.gap-3
          account-badge(v-for="guest of guests" :key="guest" @click="gift.to = guest.pub" :pub="guest.pub")
    .p-4.bg-light-300.bg-opacity-30.flex.flex-wrap.gap-4
      input(v-model="gift.qn"  placeholder="Quantity")
      input(v-model="gift.ql" placeholder="Quality")
      textarea(v-model="gift.wish" placeholder="Wish")
    .flex
      ProjectCard(:project="project" :path="gift.project")
    button.button(@click="propose(); $emit('sent')") Propose

</template>