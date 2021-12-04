<script setup>
import { useSpace, useSvgMouse, account, color, soul } from '@composables'

const gameName = 'alane'

const plane = useSpace(gameName)

const { svg, area, mouse } = useSvgMouse()

const my = reactive({
  id: null,
  x: computed(() => mouse.normX),
  y: computed(() => 1 - mouse.normY),
});

const players = reactive({
});

let all

plane.db.get("players")
  .on(d => {
    all = d._['>']
  })
  .map()
  .once(function (acc, id) {
    if (acc == null) {
      return
    }
    players[id] = {
      blink: false,
      pub: '',
      pulse: 0,
      entered: all?.[id],
      age: 0,
      pos: {
        x: 0,
        y: 0,
      }
    }

    players[id].pub = id
    players[id].pulse = acc.pulse
    if (account.pulse - acc.pulse > 5000) {
      this.put(null)
    }
    this.get('pulse').on(d => {
      players[id].pulse = d
      players[id].age = d - players[id].entered
      players[id].blink = !players[id].blink
    })
    this.get('space').get(gameName).get('pos').map().on((d, k) => {
      players[id].pos[k] = d
    })
  });

async function join() {
  if (!account.is) return

  my.id = players.next % players.max;

  const myRec = account.space.get(gameName);

  watch(mouse, (m) => {
    if (!account.is) return
    myRec.get('pos').put({ x: m.normX, y: 1 - m.normY });
  });

  plane.db.get('players').get(account.is.pub).put(account.user);
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
    defs
      filter#shadowButton(x="-50%" height="200%" width="300%")
        feDropShadow(dx="0" dy="3" stdDeviation="3" flood-color="#2225")
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
        v-for="player in players" :key="player" 
        :transform="`translate(${player?.pos?.x * 1000} ${player?.pos?.y * 1000})`"
        :data-pulse="player.pulse"
      )
        circle.transition-all.duration-700.ease-out(
          style="filter:url(#shadowButton)"
          :r="10 + player.age / 6000"
          :fill="color.deep.hex(player.pub)"
          stroke-width="2"
          stroke-opacity="0.5"
          :stroke="player.blink ? 'white' : 'black'"
        )
</template>