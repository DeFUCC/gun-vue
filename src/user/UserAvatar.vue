<script setup lang="ts">
import { useUser, useAvatar } from "#composables";
import { AccountAvatar, FormPicture } from "../components";


const { user } = useUser();

const props = defineProps({
  size: { type: Number, default: 120 },
  pic: { type: Number, default: 200 },
})

const { remove, upload, avatar } = useAvatar()
</script>

<template lang="pug">
.flex.flex-col.relative.items-center.justify-center
  account-avatar(
    :pub="user.pub" 
    :size="size" 
    )

  form-picture.absolute(
    :options="{ picSize: props.pic, preserveRatio: false }"
    @update="upload($event)"
    )
    .text-2xl
      .i-la-camera(v-if="!avatar")
      .i-la-trash-alt(
        v-else 
        @click.stop.prevent="remove()"
        )
</template>
