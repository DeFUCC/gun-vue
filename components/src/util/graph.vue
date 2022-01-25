<script setup >
import { useGun, useColor } from '@composables';
import { ref, onBeforeUnmount } from 'vue'

const graph = ref({});

const colorLight = useColor('light')

const gun = useGun()

const timer = setInterval(() => {
  graph.value = { ...gun._.graph };
}, 1000);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template lang="pug">
article.overflow-hidden.m-4.rounded-xl.break-all
  .p-2px.text-sm(
    :style="{ backgroundColor: colorLight.hex(i) }",
    v-for="(g, i) in graph",
    :key="i"
  )
    .flex.cursor-pointer(@click="g.show = !g.show")

      account-avatar(v-if="i[0] == '~'" :pub="i.slice(1, 88)" :size="20")
      .item {{ i[0] == '~' ? i.slice(88) : i }}
    transition(name="fade")
      section(v-if="g.show")
        //- .id {{ i }}
        .p-2(v-for="(r, j) in g", :key="j", v-show="j != '_' && j != 'show'")
          .font-bold {{ j }}
          .content {{ r }}
</template>
