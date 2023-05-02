<script setup lang="ts">
import { computed } from 'vue'
import { countProjects, useUser } from '#composables';

const { user } = useUser()

const count = countProjects()
const countMy = computed(() => countProjects(user.pub))
</script>

<template lang="pug">
.flex.flex-col.flex-auto.relative
  router-link.py-2.px-4.flex.bg-dark-100.bg-opacity-10.gap-2(to="/posts/")
    .font-bold.text-xl POSTS
    .flex-auto
    //- .flex.flex-auto.items-center.gap-2
    //-   router-link.link(
    //-     v-if="user?.is"
    //-     to="/posts/my/"
    //-     ) My posts
    //-       .px-8px.py-4px.text-xs.font-bold.bg-light-100.dark-bg-dark-500.rounded-xl {{ countMy }}
  router-view(v-slot="{ Component }")
    transition(name="fade")
      keep-alive(max="12")
        component(:is="Component" )
</template>