<script setup>
import { useSpace, useSvgMouse, account, color } from '@composables'

const space = useSpace('testSpace')

const { svg, area, mouse } = useSvgMouse()

const my = reactive({
  num: null,
  x: computed(() => mouse.normX),
  y: computed(() => 1 - mouse.normY),
});

const players = reactive({
  next: 0,
  max: 10,
  list: {},
});

space.db.get("playersNext").on((d) => (players.next = d));
space.db.get("players")
  .map()
  .on((d, k) => {
    if (d == null) return;
    players.list[k] = { ...d };
  });

async function join() {
  if (!account.is) return

  my.num = players.next % players.max;

  const myRec = space.db.get("players").get(my.num);

  watch(mouse, (m) => {
    myRec.put({ x: m.normX, y: 1 - m.normY });
  });

  let player = {
    pub: account.pub,
    pulse: Date.now(),
    x: mouse.normX,
    y: 1 - mouse.normY,
  };

  myRec.put(player);
  space.db.get("playersNext").put(my.num + 1);
}

</script>

<template lang='pug'>
.flex.flex-col.items-center
  svg(
    @click="join()"
    ref="svg"
    version="1.1",
    baseProfile="full",
    viewBox="0 0 1000 500",
    xmlns="http://www.w3.org/2000/svg",
    font-family="Commissioner , sans-serif"
    text-anchor="middle",
    dominant-baseline="middle"
  )
    rect(
      ref="area"
      x="2"
      y="0"
      width="1000"
      height="1000"
      fill="none"
      stroke-width="0"
      )
    g.me(:transform="`translate(${my.x * 1000} ${my.y * 1000})`")
      circle(
        fill="red"
        r="4"
      )
    g.players
      g.player(
        v-for="player in players.list" :key="player" 
        :transform="`translate(${player.x * 1000} ${player.y * 1000})`"
      )
        circle(
          r="10"
          :fill="color.deep.hex(player.pub)"
        )
</template>