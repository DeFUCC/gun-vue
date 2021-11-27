<script setup>
import { usePlayers } from '@store/players';

const { players, me, join } = usePlayers()

</script>

<template lang="pug">
.flex.flex-col.p-4
  .font-bold Players online
  button(
    class="hover:shadow-xl m-2 p-4 shadow-md transition-all duration-400 ease" 
    @click="join()" 
    v-if="!me.pub"
    ) Join
  .flex.flex-col(:key="players.count")
    transition-group(name="fade")
      user-point(v-for="(player,p) in players.list" :key="player.pub" v-bind="player" )
</template>