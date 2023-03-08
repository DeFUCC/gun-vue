<script setup lang="ts">
import { useAccount, useUser, addProfileField } from '#composables'
import { ref } from 'vue'

const { user } = useUser()

const { account } = useAccount(user.pub)

const newField = ref('')
</script>

<template lang="pug">
.flex.flex-col
  .flex.flex-col.p-2
    user-profile-field(
      v-for="(d, k) in account.profile" 
      :key="d"
      :field="`${k}`" 
      :content="d")
    .flex.items-center.flex-wrap
      input.p-2.rounded-lg.shadow-md.dark-bg-dark-400(
        v-model="newField" 
        placeholder="New profile field" 
        @keydown.enter="addProfileField(newField)")
      button.m-2.button.items-center.dark-bg-dark-400(@click="addProfileField(newField)")
        .i-la-plus
        .p-1.text-sm Add
</template>