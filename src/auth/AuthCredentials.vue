<script setup>
import { ref, computed, reactive, watchEffect } from "vue";
import { asyncComputed, useClipboard, useShare } from "@vueuse/core";

import { useUser, gunAvatar, SEA, useGun } from "#composables";

import { useCredentials } from "./useCredentials";
import { QrShow } from "../components";

const emit = defineEmits(["close"]);

const { text, copy, copied, isSupported: canCopy } = useClipboard();
const { share, isSupported: canShare } = useShare();

const { saveImage, saveJson, saveLink, shareImage } = useCredentials();
const { user } = useUser();

const input = ref("");
const isSet = ref(false);
const shows = ref(false);
const showQr = ref(false);

const enc = asyncComputed(async () =>
  input.value ? await SEA.encrypt(user.pair(), input.value) : null
);
const href = computed(() => genLink(enc.value));
const png = computed(() =>
  gunAvatar({ pub: user.pub, embed: enc.value, svg: false })
);

const svgContent = computed(() =>
  gunAvatar({ pub: user.pub, embed: enc.value, svg: true, p3: false })
);

function genLink(text = "", auth_url = "#/auth/") {
  let base = encodeURIComponent(text);
  return window.location.origin + window.location.pathname + auth_url + base;
}
</script>

<template lang="pug">
.flex.flex-col.items-stretcvh.gap-2.shadow-lg.bg-dark-100.backdrop-blur.bg-opacity-60.rounded-xl.p-4(v-if="user.is" :key="user.is")
  form.flex.flex-col.items-center.justify-center.gap-2.relative.flex-1(@submit.prevent.stop="isSet = true")


    .flex.w-full.relative
      input#password.p-4.rounded-xl.w-full.dark-bg-dark-700.text-center(
        v-model="input",
        name="password"
        autocomplete="current-password" 
        :disabled="isSet"
        :type="shows ? 'text' : 'password'"
        :placeholder="`5+ letters`")

      button.text-xl.absolute.right-2.top-4.op-40.hover-op-90.transition-800(@click="shows = !shows" type="button")
        .i-la-eye(v-if="!shows")
        .i-la-eye-slash(v-else)
    .text-sm.p-2.op-60.justify-center(v-if="!isSet") Set a password to encrypt your key backup
    .flex.gap-2.w-full
      button.button.items-center.flex-1(
        :disabled="input.length < 5 || isSet",
        v-if="!isSet"
        type="submit") 
        .i-la-check.text-2xl
        .ml-2 Set

  .flex.flex-col.items-start(v-if="isSet")
    .text-sm.p-2.op-60.text-center Save your encrypted key in a secure place. Write down the password. Keep it safe.
    .flex.gap-2.p-2.text-sm.flex-wrap.items-center
      .i-la-key.text-3xl
      button.button.items-center.text-2xl(v-if="canCopy" @click="copy(enc)")
        .i-la-copy(v-if="!copied")
        .i-la-check(v-else)
      button.button.items-center(@click="saveJson(enc, user.name)")
        .i-la-download.text-2xl
      button.button.items-center.text-2xl(v-if="canShare" @click="share({ title: user.name || 'User', text: enc })")
        .i-la-share-square.text-2xl

    .flex.gap-2.p-2.text-sm.flex-wrap.items-center
      a.i-la-link.text-3xl(:href target="_blank")
      button.button.items-center.text-2xl(v-if="canCopy" @click="copy(href)")
        .i-la-copy(v-if="!copied")
        .i-la-check(v-else)
      button.flex-1.button.items-center(@click="showQr = !showQr" :class="{ active: showQr }")
        .i-la-qrcode.text-2xl
      button.button.items-center(@click="saveLink(href, user.name)")
        .i-la-download.text-2xl
      button.button.items-center(v-if="canShare" @click="share({ title: user.name || 'User', text: href })")
        .i-la-share-square.text-2xl

    .flex.flex-wrap.p-2.gap-2.items-center
      img(:src="gunAvatar({ pub: user.pub, size: 35 })")
      button.button.items-center(@click="saveImage(png, user.name, 'png')")
        .i-la-image.text-2xl
      button.button.items-center(@click="saveImage(svgContent, user.name, 'svg')")
        .i-la-file-image.text-2xl
      button.button.items-center(v-if="canShare" @click="shareImage(png, user.name)")
        .i-la-share-square.text-2xl

  transition(name="fade" mode="out-in")
    .p-4.flex.flex-col.gap-2.items-center(v-if="showQr" key="qr")
      qr-show(:data="enc")

  button.button.items-center.flex-1.justify-center(
    v-if="isSet"
    @click="input = ''; isSet = false; emit('close')"
    :disabled="!input || !isSet"
    type="button") 
    .i-la-check.text-2xl
    .ml-2 Key pair backed up
</template>

<style scoped></style>
