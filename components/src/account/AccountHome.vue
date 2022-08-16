<script setup>
import { useAccount, useUser, useBackground, useProjects } from '#composables';
import { computed, toRef, ref } from 'vue'
const props = defineProps({
  pub: { type: String, default: '' }
})

defineEmits(['browse', 'feed', 'post', 'chat', 'user', 'project'])

const { account, setPetname } = useAccount(toRef(props, 'pub'));
const { user } = useUser()

const bg = computed(() => useBackground({ pub: props.pub, size: 600, light: 0.5, draw: 'circles' }))

const petname = ref('')
const editPetname = ref(false)

const { projects } = useProjects(props.pub)

</script>

<template lang='pug'>
.flex.flex-col.rounded-3xl.overflow-hidden.shadow-xl
  .p-4.flex.items-center.bg-cover.border-b-6(:style="{ borderColor: account.color, ...bg }")
    account-avatar(:pub="pub" :size="120" @click="$emit('user', pub)")
    .flex.flex-col.ml-4.mx-4
      .text-2xl.font-bold {{ account.profile?.name }}
      .mt-2 {{ account?.lastSeen }}
    .flex-1
    mate-button.m-4(:pub="pub")
    chat-private-count(:pub="pub" v-if="user.is" @chat="$emit('chat')")
  .p-2.flex(:style="{ backgroundColor: account.color }" v-if="pub != user.pub")

    #petname.flex.items-center.gap-2(v-if="user.is")
      account-avatar(:pub="pub" :size="40")
      .text-lg.flex.items-center.gap-2(v-if="account?.petname && !editPetname") {{ account?.petname }}
        la-pen(@click="editPetname = !editPetname")
      input.m-1.p-2.rounded-lg(
        v-else 
        v-model="petname" 
        placeholder="Set private petname"
        @keydown.enter="setPetname(pub, petname); editPetname = false"
        @keydown.escape="editPetname = false"
        )

  account-profile.p-4(:pub="pub")
  .p-4.flex.flex-col
    mate-list(:pub="pub" @browse="$emit('browse', $event)")
    gift-wallets(:pub="pub")
    //- account-stars(:pub="pub" @feed="$emit('feed', $event)")
    template(v-if="Object.keys(projects).length > 0")
      .text-xl.font-bold.p-2.mt-4 Projects
      .flex.flex-col.gap-4
        project-card(
          v-for="(proj, path) in projects" 
          @click="$emit('project', path + '@' +pub)"
          :key="path"
          :project="proj"
          :path="path + '@' +pub"
          )
      account-reactions.m-2(:pub="pub" @post="$emit('post', $event)")
</template>