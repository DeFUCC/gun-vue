<script setup lang="ts">
import { useAccount, useUser, useBackground, useProjects } from '../composables';
import { computed, toRef } from 'vue'
const props = defineProps({
  pub: { type: String, default: 'OKrDaDeD8VeA27d673RqlodSnebnaDq6Ci23Ys_ABWE.q8fI2lkxO46R8TMjeUeAf7I0yBS5mdH_Cb9_285Wkqk' }
})

defineEmits(['browse', 'feed', 'post', 'chat', 'user', 'project'])

const { account } = useAccount(toRef(props, 'pub'));
const { user } = useUser()

const bg = computed(() => useBackground({ pub: props.pub, size: 600, light: 0.5, draw: 'circles' }))

const { projects } = useProjects(props.pub)

</script>

<template lang="pug">
.flex.flex-col.rounded-3xl.overflow-hidden.shadow-xl
  .p-4.flex.items-center.bg-cover.border-b-6(
    :style="{ borderColor: account.color, ...bg }"
    )
    account-avatar(
      :pub="pub" 
      :size="120" 
      @click="$emit('user', pub)"
      )
    .flex.flex-col.ml-4.mx-4
      .text-2xl.font-bold {{ account.profile?.name }}
      .mt-2 {{ account?.lastSeen }}
    .flex-1
    mate-button.m-4(:pub="pub")
    chat-private-count(
      v-if="user.is" 
      :pub="pub" 
      @chat="$emit('chat')"
      )
  account-petname(
    v-if="pub != user.pub" 
    :pub="pub" 
    :style="{ backgroundColor: account.color }"
    )

  account-profile.p-4(:pub="pub")
  .p-4.flex.flex-col

    gift-wallets(:pub="pub")
    mate-list(
      :pub="pub" 
      @browse="$emit('browse', $event)"
      )
    //- account-stars(:pub="pub" @feed="$emit('feed', $event)")
    template(v-if="Object.keys(projects).length > 0")
      .text-xl.font-bold.p-2.mt-4 Projects
      .flex.flex-col.gap-4
        project-card(
          v-for="(proj, path) in projects" 
          :key="path"
          :project="proj"
          :path="path + '@' + pub"
          @click="$emit('project', path + '@' + pub)"
          )
      account-reactions.m-2(
        :pub="pub" 
        @post="$emit('post', $event)"
        )
</template>