<script setup>
import { useUser, useGun, hashText } from '@composables'
import { ref } from 'vue'

const { user } = useUser()
const gun = useGun()



const avatar = ref(null)

user.db.get('avatar').on(hash => {
  gun.get('#avatars').get(hash).once(d => {
    avatar.value = d
  })
})

async function uploadAvatar(file) {
  const hash = await hashText(file)
  gun.get('#avatars').get(hash).put(file)
  user.db.get('avatar').put(hash)
}

function removeAvatar() {
  user.db.get('avatar').put(null)
}

</script>

<template lang='pug'>
.flex.flex-col.relative.items-center.justify-center
  account-avatar(:pub="user.pub" :size="100" v-if="!avatar")
  img.w-120px.h-120px(:src="avatar" v-else)

  post-form-picture.absolute(@update="uploadAvatar($event)")
    .text-2xl.bg-light-100.rounded-xl.bg-opacity-20.hover_bg-opacity-90.shadow.cursor-pointer
      la-upload(v-if="!avatar")
      la-trash-alt(v-else @click.stop.prevent="removeAvatar()")
</template>