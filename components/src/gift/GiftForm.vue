<script setup>
import { useGuests, useNewGift, useUser, useProject } from '#composables'
import ProjectCard from '../project/ProjectCard.vue';

const props = defineProps({
  gift: {
    type: Object,
    default: {

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
.flex.flex-col
  .grid.p-4.gap-2.items-center(style="grid-template-columns: 1fr 10fr;")

    .p-2 FROM
    .flex-1 
      account-badge(:pub="user.pub")

    .p-2 TO
    account-badge(:pub="gift.to" v-if="gift.to")
      .flex-1
      la-times.mr-2(@click="gift.to = ''")
    .flex.flex-col(v-else)
      .font-bold USER SELECT OF {{ count.total }}
      .flex.flex-wrap.gap-3
        account-badge(v-for="guest of guests" :key="guest" @click="gift.to = guest.pub" :pub="guest.pub")

    .p-2 Project
    project-card(:project="project" :path="gift.project")

    .p-2 Quantity
    input(v-model="gift.qn"  placeholder="Quantity")

    .p-2 Quality
    input(v-model="gift.ql" placeholder="Quality")

    .p-2 Wish 
    textarea(v-model="gift.wish" placeholder="Wish")


    button.button(@click="propose(); $emit('sent')") Propose
    .font-mono.text-sm.m-4.opacity-50.break-all.col-span-2 {{ gift }}
</template>