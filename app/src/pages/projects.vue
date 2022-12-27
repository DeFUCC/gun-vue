<script setup>
import { countProjects, useUser } from '#composables';

const { user } = useUser()

const count = countProjects()
const countMy = countProjects(user.pub)

</script>

<template lang="pug">
.flex.flex-col.flex-auto.relative
  router-link.py-2.px-4.flex.bg-dark-100.bg-opacity-10.gap-2(to="/projects/")
    .font-bold.text-xl PROJECTS
    .flex.flex-auto.items-center.gap-2
      router-link.link(to="/projects/my/") My {{ countMy }} 
      router-link.link(to="/projects/public/") Public {{ count }}
  router-view(v-slot="{ Component }")
    keep-alive
      transition(
        name="fade" 
        mode="out-in")
        component(:is="Component" )
</template>

<style scoped lang="postcss">
.link {
  @apply flex-1 bg-light-200 rounded-lg shadow px-4 py-1 text-center;
}

.link.router-link-exact-active {
  @apply bg-light-800;
}
</style>