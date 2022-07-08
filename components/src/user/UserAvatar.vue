<script setup>
import { useUser, useGun, hashText } from '@composables'
import { ref } from 'vue'

const { user } = useUser()
const gun = useGun()

const props = defineProps({
  size: { type: Number, default: 120 },
  pic: { type: Number, default: 200 }
})

const avatar = ref(null)

user.db.get('avatar').on(hash => {
  if (hash) {
    gun.get('#avatars').get(hash).once(d => {
      avatar.value = d
    })
  } else {
    avatar.value = null
  }

})

async function uploadAvatar(file) {
  if (file) {
    const hash = await hashText(file)
    gun.get('#avatars').get(hash).put(file)
    user.db.get('avatar').put(hash)
  } else {
    removeAvatar()
  }

}

function removeAvatar() {
  user.db.get('avatar').put(null)
}

</script>

<template lang='pug'>
.flex.flex-col.relative.items-center.justify-center
  account-avatar(:pub="user.pub" :size="size" )

  form-picture.absolute(
    :options="{ picSize: props.pic, preserveRatio: false }"
    @update="uploadAvatar($event)"
    )
    .text-2xl
      la-camera(v-if="!avatar")
      la-trash-alt(v-else @click.stop.prevent="removeAvatar()")
</template>