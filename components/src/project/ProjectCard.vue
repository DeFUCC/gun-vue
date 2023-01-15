<script setup>
import { useColor, useUser, removeProject, currentRoom } from '#composables'

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
  :style="{ background: `url(${project?.cover || project?.raw})`, backgroundColor: project.color }"
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
  .flex.flex-wrap.items-center.max-w-full.w-full.backdrop-blur-lg.rounded-2xl.bg-light-100.backdrop-blur-sm.backdrop-filter.shadow-md
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
          .text-xl.font-bold.my-2(v-if="project?.title") {{ project.title }}

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
          //- account-badge(:pub="path.slice(-87)")
        .statement(v-if="project?.statement") {{ project.statement }}

    //- .flex.gap-1.rounded-xl.p-1.bg-dark-50.bg-opacity-20.flex-wrap.items-center(style="flex: 1 1 130px" v-if="actions")
    //- post-action-react(:authors="authors" @user="$emit('user', $event)" :hash="hash" :tag="tag" :back="back")



    //- post-action-update(:hash="hash" )
    //- post-action-ban(:hash="hash" :tag="tag")

    //- post-action-star(:hash="hash" )
</template>


<style lang="postcss" scoped>
.card {
  @apply transition duration-300ms ease-out min-w-280px p-2px pl-2 rounded-2xl cursor-pointer flex flex-wrap items-end bg-cover bg-center;
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