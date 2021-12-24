<script setup >
import { gun, gunAvatar, color } from "@composables";

const graph = ref({});

const timer = setInterval(() => {
  graph.value = gun._.graph;
}, 500);

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<template lang="pug">
article.m-4.p-2.rounded-xl.shadow-xl
  .cursor-pointer.p-2px.text-sm(
    :style="{ backgroundColor: color.light.hex(i) }",
    v-for="(g, i) in graph",
    :key="i"
  )
    .flex(@click="g.show = !g.show")
      .rounded-full.overflow-hidden(
        :style="{ backgroundColor: color.light.hex(i.slice(1, 88)) }",
        v-if="i[0] == '~'"
      ) 
        img(
          :src="gunAvatar(i.slice(1, 88), 16)"
        )
      .item {{ i[0] == '~' ? i.slice(88) : i }}
    transition(name="fade")
      section(v-if="g.show")
        .id {{ i }}
        .p-1(v-for="(r, j) in g", :key="j", v-show="j != '_' && j != 'show'")
          .font-bold {{ j }}
          .content {{ r }}
</template>
