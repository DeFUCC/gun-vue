<script setup >
import { gun, color } from "@composables";

const graph = ref({});

const timer = setInterval(() => {
  graph.value = gun._.graph;
}, 500);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template lang="pug">
article
  .cursor-pointer.border-1.text-sm(
    :style="{ backgroundColor: color.light.hex(i) }",
    v-for="(g, i) in graph",
    :key="i"
  )
    .flex(@click="g.show = !g.show")
      .py-1(
        :style="{ backgroundColor: color.light.hex(i.slice(1, 88)) }",
        v-if="i[0] == '~'"
      ) {{ i.slice(1, 6) }}...
      .item {{ i[0] == '~' ? i.slice(88) : i }}
    transition(name="fade")
      section(v-if="g.show")
        .id {{ i }}
        .p-1(v-for="(r, j) in g", :key="j", v-show="j != '_' && j != 'show'")
          .font-bold {{ j }}
          .content {{ r }}
</template>
