<script setup>
import { useGun, theme } from '#composables';
import { ref, onBeforeUnmount } from 'vue'
import { AccountAvatar } from '../components'

const graph = ref({});



const gun = useGun()

const timer = setInterval(() => {
  graph.value = { ...gun._.graph };
}, 1000);

onBeforeUnmount(() => {
  clearInterval(timer);
});


</script>

<template lang="pug">
article.rounded-xl.break-all.flex.flex-col.gap-2
  .text-sm.bg-light-800.dark-bg-dark-800(
    v-for="(g, i) in graph",
    :key="i",
  )
    .flex.cursor-pointer(@click="g.show = !g.show")

      account-avatar(
        v-if="i[0] == '~'"
          :pub="i.slice(1, 88)" 
          :size="20")
      .item {{ i[0] == '~' ? i.slice(88) : i }}
    transition(name="fade" mode="out-in" appear)
      section(v-if="g.show")
        //- .id {{ i }}
        .p-2(
          v-for="(r, j) in g", 
          v-show="j != '_' && j != 'show'", 
          :key="j")
          .font-bold {{ j }}
          .content {{ r }}
</template>
