<script setup>
import { useUser, useAuth, gunAvatar } from '#composables'
import { AuthPass, QrShow } from '../components'
import { ref, computed } from 'vue'
import { useClipboard, useShare } from '@vueuse/core'
import { useCredentials } from './useCredentials'


const emit = defineEmits(['close'])

const current = ref('pass')

const { user } = useUser()

function show(option) {
  if (current.value != option) {
    current.value = option;
  } else {
    current.value = null;
  }
}

const { pass } = useAuth()


const { text, copy, copied, isSupported: canCopy } = useClipboard()
const { share, isSupported: canShare } = useShare()

const safePair = ref(true)

const encPair = computed(() => {
  return safePair.value ? pass?.safe?.enc : JSON.stringify(user.pair())
});

const href = computed(() => safePair.value ? pass.links.pass : pass.links.pair)

const png = computed(() => gunAvatar({ pub: user.pub, embed: encPair.value }))

const svgContent = computed(() => gunAvatar({ pub: user.pub, embed: encPair.value, svg: true }))

const { saveBookmark, saveImage, saveJson, saveLink, shareImage } = useCredentials()

const platforms = {
  Win: 'Windows',
  Mac: 'MacOS',
  Linux: 'Linux'
}


</script>

<template lang="pug">
.flex.flex-col.items-stretch.pb-4.border-1.border-dark-100.border-opacity-10.max-w-120.mx-auto.dark-bg-dark-200(v-if="user.is" :key="user.is")
  .mt-4.mx-6 Please make sure to safely store your cryptographic keypair to be able to use it again later
  auth-pass
  .flex.p-4.items-center.bg-dark-100.bg-opacity-20.mt-2.shadow-inset(v-if="pass?.safe?.enc")
    .flex.flex-col.w-34.items-center(:style="{ color: safePair ? 'green' : 'red' }")
      button.m-2.button.text-2xl(@click="safePair = !safePair")
        .i-la-lock(v-if="safePair")
        .i-la-unlock(v-else)
      .text-sm {{ safePair ? 'Encrypted' : 'Plain Text' }}
      .text-m Key Pair
    .flex.flex-wrap.gap-2.p-2
      button.button.items-center(@click="show('key')" :class="{ active: current == 'key' }")
        .i-la-envelope-open-text.text-2xl
        .px-2 Text
      button.button.items-center(
        :href="href" 
        target="_blank" 
        @click="show('link')" 
        :class="{ active: current == 'link' }"
        )
        .i-la-link.text-2xl
        .px-2 Link
      button.button.items-center(@click="show('qr')" :class="{ active: current == 'qr' }")
        .i-la-qrcode.text-2xl
        .px-2 QR

      button.button.items-center(@click="show('avatar')" :class="{ active: current == 'avatar' }")
        .i-la-user-circle.text-2xl
        .px-2 Avatar

  .flex.w-full.justify-center.mt-4(v-if="current")

    transition(name="fade" mode="out-in")

      .p-2.flex.flex-col.w-full.items-start(v-if="current == 'key'", key="text")
        .flex.gap-2.items-center.mx-4
          button.button.items-center(
            v-if="canCopy" 
            @click="copy(encPair)"
            )
            .i-la-copy.text-2xl
            transition(name="fade" mode="out-in" appear)
              .px-2(v-if="copied") Copied!
              .px-2(v-else) Copy
          button.button.items-center(
            v-if="canShare" 
            :class="{ active: current == 'pass' }" 
            @click="share({ title: user.name || 'Gun-Vue keypair', text: encPair })"
            )
            .i-la-share.text-2xl
            .px-1 Share
          button.button.items-center(@click="saveJson(encPair, user.name)")
            .i-la-download.text-2xl
            .px-2 Download
        .w-full.p-4.text-sm.flex-1.rounded-xl.break-all.select-all.transition-4000(
          key="text", :class="{ 'blur-lg hover-blur-0': !safePair }"
        ) {{ encPair }}

      .p-2.flex.flex-col.items-center(v-else-if="current == 'avatar'" key="avatar")

        .flex.gap-2.items-center.mt-4
          button.button.items-center(@click="saveImage(png, user.name)")
            .i-la-download.text-2xl
            .px-2 PNG
          button.button.items-center(@click="saveImage(svg, user.name, 'svg')")
            .i-la-download.text-2xl
            .px-2 SVG
          button.button.items-center(
            v-if="canShare"
            @click="shareImage(png, user.name)")
            .i-la-share.text-2xl
            .px-1 Share
        img.cursor-pointer.shadow-lg.rounded-full.hover-lightness-120.hover-shadow-2xl.-hover-translate-y-1.transition.active-translate-y-1( :src="png" @click="saveImage(png, user.name)")
        .text-sm.op-50.text-center.m-4.max-w-50 Click the image to download the PNG file with your key embedded. You can use to login later. 

      .p-4.flex.flex-col.gap-2(
        key="link"
        v-else-if="current == 'link'") 
        .flex.flex-wrap.gap-2.items-center.mx-4
          button.button.items-center(
            v-if="canCopy" 
            @click="copy(href)"
            )
            .i-la-copy.text-2xl
            transition(name="fade" mode="out-in" appear)
              .px-2(v-if="copied") Copied!
              .px-2(v-else) Copy
          button.button.items-center(
            v-if="canShare" 
            :class="{ active: current == 'pass' }"
            @click="share({ title: user.name || 'Gun-Vue Login link', text: href })"
            )
            .i-la-share.text-2xl
            .px-1 Share

          button.button.items-center(
            v-for="(label, platform) in platforms" :key="platform"
            @click="saveLink(href, platform, user.name)"
            )
            .i-la-download.text-2xl
            .px-2 {{ label }}

        a.m-2.button.items-center.break-all(
          :href="href" 
          target="_blank" 
          @click="show('links')" 
          )
          .i-la-link.text-2xl
          .px-2.font-normal.font-mono.text-xs.transition-4000(:class="{ 'blur-lg hover-blur-0': !safePair }") {{ href }}

      .p-4.flex.flex-col.gap-2.items-center(v-else-if="current == 'qr'" key="qr" )
        qr-show.max-w-600px.transition-4000(
          :class="{ 'blur-lg hover-blur-0': !safePair }"
          :data="safePair ? pass.links.pass : pass.links.pair"
          )
        .text-sm.op-50.text-center.mx-4.max-w-80 Make a screenshot to save the QR code for logging in later.
  slot
</template>

<style scoped></style>