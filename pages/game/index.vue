<script setup>
import { useGame } from '@use/game';

const { svg, area, my, players, mouse, join } = useGame()

</script>

<template lang='pug'>
.flex.flex-col.p-4
  .text-2xl.font-bold Map
    button.p-4.shadow-xl(@click="join()") Join
  svg.m-4.shadow-xl.rounded-xl(
    ref="svg"
    version="1.1",
    baseProfile="full",
    viewBox="0 0 1000 1000",
    xmlns="http://www.w3.org/2000/svg",
    font-family="Commissioner , sans-serif"
    text-anchor="middle",
    dominant-baseline="middle"
  )
    rect(
      ref="area"
      x="0"
      y="0"
      width="1000"
      height="1000"
      fill="none"
      stroke="currentColor"
      stroke-width="1px"
      opacity="0.5"
    )
    g.me(:transform="`translate(${my.x * 1000} ${my.y * 1000})`")
      circle(
        fill="black"
        r="20"
      )
    g.players
      g.player(
        v-for="player in players.list" :key="player" 
        :transform="`translate(${player.x * 1000} ${player.y * 1000})`"
      )
        circle(
          r="10"
        )
  .p-4 {{ my }}
  .p-4 {{ players }}
</template>