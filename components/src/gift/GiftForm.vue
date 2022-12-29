<script setup>
import { useGuests, useNewGift, useUser, useProject, useProjects, currentRoom, useColor, useGun } from '#composables'
import { toRef, watch, computed, reactive } from 'vue'
import { number } from '@coders-tm/vue-number-format' // https://vue-number-format.netlify.app/guide/#globally
import vSelect from 'vue-select' // https://vue-select.org/
import 'vue-select/dist/vue-select.css';
import { currencies } from './currencies.js';

const numOpts = {
  decimal: '.',
  separator: ' ',
  prefix: '',
  precision: 2,
  masked: false,
}

const props = defineProps({
  gift: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['sent', 'update:gift'])

const { user } = useUser()

const { gift: newGift, cleanGift, propose, proposed, hash, valid } = useNewGift(props.gift)

const { guests, count } = useGuests()


const { project } = useProject(toRef(newGift, 'project'))

const { projects } = useProjects()

const color = useColor()

watch(() => newGift.wallet, w => {
  if (!w) return
  newGift.ql = w.currency
})

const guestsWithWallets = computed(() => {
  const gun = useGun()
  const list = reactive({})
  Object.keys(guests).forEach(g => {
    gun.user(g).get('wallets').on((d, k) => {
      list[g] = guests[g]
    })
  })
  return list
})

const userProjects = computed(() => {
  const projs = reactive({})
  Object.keys(projects).forEach(p => {
    if (p.includes(newGift.to)) {
      projs[p] = projects[p]
    }
  })
  return projs
})


</script>

<template lang="pug">
.flex.flex-col.max-w-140
  .grid.p-4.gap-2.items-center(style="grid-template-columns: 1fr 10fr;")

    .p-2.text-right FROM
    .flex-1 
      account-badge(
        v-if="user.pub" 
        :pub="user.pub"
        )
      user-auth(v-else)

    .p-2.text-right TO 
    account-badge(
      v-if="newGift.to" 
      :pub="newGift.to"
      )
      .flex-1
      .i-la-times.mr-2(@click="newGift.to = ''; newGift.wallet = null")
    .flex.flex-col(v-else)
      .font-bold USER SELECT OF {{ Object.keys(guestsWithWallets).length }}
      .flex.flex-wrap.gap-3
        account-badge(
          v-for="guest of guestsWithWallets" 
          :key="guest" 
          :pub="guest.pub" 
          @click="newGift.to = guest.pub"
          )

    template(v-if="newGift.to")
      .p-2.text-right WALLET
      gift-wallets(
        :key="newGift.to"
        :pub="newGift.to" 
        :active-wallet="newGift.wallet" 
        @wallet="newGift.wallet = $event"
        @clear="newGift.wallet = null"
        )
      template(v-if="newGift.wallet")
        .p-2.text-right Quantity
        number(
          v-model="newGift.qn" 
          v-bind="numOpts" 
          placeholder="Quantity")

        .p-2.text-right Quality
        //- input(v-model="newGift.ql" placeholder="Quality")
        vSelect.rounded-xl(
          v-model="newGift.ql"
          :options="currencies"
          :append-to-body="true"
          placeholder="Currency abbreviation or short object description"
          :taggable="true"
          :push-tags="true"
          )

        .p-2.text-right.self-start Wish 
        textarea.p-2(
          v-model="newGift.wish" 
          placeholder="Wish"
          )

        .p-2.text-right PROJECT 
          .w-full(
            v-if="!newGift.project"
            ) SELECT
        project-card(
          v-if="newGift.project" 
          :project="project" 
          :path="newGift.project"
          )
          .i-la-times(@click="newGift.project = null")
        .flex.flex-wrap.gap-1(v-else)
          .p-2.rounded-xl.cursor-pointer(
            v-for="(proj, p) in userProjects" 
            :key="p"
            :style="{ backgroundColor: proj.color }"
            @click="newGift.project = proj.path"
            )
            .font-bold {{ proj.title }}

        .p-2.text-right ROOM
        room-button

        .flex(v-if="valid")
          button.button.w-full.justify-center(@click="propose(); $emit('sent', hash)") Propose


        pre.overflow-scroll.font-mono.text-xs.m-4.opacity-50.break-all.col-span-2 {{ cleanGift }}
        .font-mono.text-xs.col-span-2.text-center.rounded-lg.m-2.transition(
          :style="{ backgroundColor: color.hex(hash || '') }"
        ) {{ hash }}
</template>