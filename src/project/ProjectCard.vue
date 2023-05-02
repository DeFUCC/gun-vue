<script setup>
import { useColor, useUser, removeProject, currentRoom } from '#composables'
import { AccountAvatar, UiLink } from '../components'

const { user } = useUser()

const colorLight = useColor('light')
const colorDeep = useColor('deep')

defineEmits(['user'])

defineProps({
  path: { type: String, default: '' },
  project: {
    type: Object,
    default: () => ({
      title: '',
      statement: '',
      color: '',
      cover: null,
      icon: null,
      link: '',
      goals: [],
      objects: [],
      events: [],
      text: ''
    })
  }
})


</script>

<template lang="pug">
.card(
  :style="{ backgroundImage: `url(${project?.cover || project?.raw || 'none'})`, backgroundColor: project.color }"
  )
  .absolute.top-2.right-2(
    v-if="path.includes(user.pub) || currentRoom.hosts[user.pub]" 
    @click.stop.prevent="removeProject(path)"
    )
    .i-la-trash
  .p-0(
    style="flex: 12 1 120px" 
    :style="{ paddingTop: project?.cover || project?.raw ? '18em' : '0' }"
    )
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-2xl.bg-light-100.dark-bg-dark-400.backdrop-blur-sm.backdrop-filter.shadow-md
    .p-0(
      v-if="project?.icon" 
      style="flex: 1 1 40px" 
      )
      img.w-20.max-h-20.rounded-full.m-2(
        :src="project.icon" 
        width="40px"
        )
    .flex.flex-col.p-2.overflow-hidden(style="flex: 10 1 280px")
      .px-2
        .flex.items-center
          .flex.flex-col.my-2
            .text-xl.font-bold(v-if="project?.title") {{ project.title }}
            .text-md(v-if="project?.description") {{ project.description }}
          .flex.items-center.flex-wrap.items-center.mt-2.gap-2
            .i-la-youtube.mx-1(v-if="project?.youtube")
            .i-mdi-text-long.mx-1(v-if="project?.text")
            ui-link(
              v-if="project?.link" 
              :url="project?.link"
              )
            .flex-1
            .text-xs.break-all.p-2
              slot 

          .flex-1
          account-badge(:pub="path.slice(-87)")

</template>


<style lang="postcss" scoped>
.card {
  @apply transition duration-300ms ease-out p-2px pl-2 rounded-2xl cursor-pointer flex flex-wrap items-end bg-cover bg-center dark-bg-dark-700;
  flex: 1 1 300px;
  filter: grayscale(10%) brightness(95%);
}

.card:hover {
  @apply shadow-md;
  filter: grayscale(0%) brightness(100%);
}

.statement {
  @apply max-h-24 overflow-ellipsis overflow-clip;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>