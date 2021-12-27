<script setup>
import { useAccount, user, color } from '@composables'

const props = defineProps({
  pub: { type: String, default: '' }
})

const pubKey = computed(() => props.pub || user.pub)
const editable = computed(() => pubKey.value && user.is)

const { account } = useAccount(pubKey)

const addField = ref(false)
const newField = ref('')

function addNewField() {
  if (!addField.value) {
    addField.value = true
    return
  }
  account.profile[newField.value] = ''
  addField.value = true
}
</script>

<template lang='pug'>
.flex.flex-col
  .flex.flex-col.p-2
    account-profile-field(
      v-for="(d,k) in account.profile" :key="d"
      :field="k" :content="d")
    .flex.items-center
      input.p-2.rounded-lg.shadow-md(v-model="newField" v-if="addField" @keydown.enter="account.profile[newField] = ''")
      button.button(@click="addNewField()" v-if="editable")
        la-plus
</template>