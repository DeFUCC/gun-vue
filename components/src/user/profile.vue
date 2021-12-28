<script setup>
import { useAccount, user, color } from '@composables'

const pubKey = computed(() => user.pub)
const editable = computed(() => pubKey.value && user.is)

const { account } = useAccount(pubKey)

const addField = ref(false)
const newField = ref('')

function addNewField() {
  if (!addField.value) {
    addField.value = true
    return
  }
  account.value.profile[newField.value] = '-'
  addField.value = true
}
</script>

<template lang='pug'>
.flex.flex-col(v-if="user.is")
  .flex.flex-col.p-2
    user-profile-field(
      v-for="(d,k) in account.profile" :key="d"
      :field="k" :content="d")
    .flex.items-center
      input.p-2.rounded-lg.shadow-md(v-model="newField" v-if="addField" @keydown.enter="account.profile[newField] = ''")
      button.button.items-center(@click="addNewField()" v-if="editable")
        la-plus
        .p-1 Add a field
</template>