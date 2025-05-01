<script setup lang="ts">
import { useUser, useUserAvatar } from "#composables";
import { AccountAvatar, FormPicture } from "../components";


const { user } = useUser();

const props = defineProps({
  size: { type: Number, default: 120 },
  pic: { type: Number, default: 200 },
  editable: { type: Boolean, default: false }
})

const { remove, upload, avatar } = useUserAvatar()
</script>

<template lang="pug">
.flex.flex-col.relative.items-center.justify-center
  account-avatar(
    :pub="user.pub" 
    :size="size" 
    )

  form-picture.absolute.op-10.hover-50.focused-op-100(
    :options="{ picSize: props.pic, preserveRatio: false }"
    @update="upload($event)"
    v-if="editable"
    )
    .text-2xl
      .i-la-camera(v-if="!avatar")
      .i-la-trash-alt(
        v-else 
        @click.stop.prevent="remove()"
        )
</template>
