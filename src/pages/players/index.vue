<script setup>
import { db, sea } from '@use/db'

const players = reactive({
  count: 0,
  max: 10,
  list: {},
})

db.get('playersCount').on(d => players.count = d)
db.get('players').map().on((d, k) => {
  if (d == null) return
  players.list[k] = { ...d }
})

const me = reactive({
  pair: null,
  num: null,
  pub: null,
  x: 0,
  y: 0,
})

async function join() {
  me.pair = await sea.pair()
  me.pub = me.pair.pub
  me.num = (players.count) % players.max
  const myRec = db.get('players').get(me.num)

  document.addEventListener('mousemove', ev => {
    me.x = ev.clientX / document.documentElement.clientWidth
    me.y = ev.clientY / document.documentElement.clientHeight
    myRec.put({ x: me.x, y: me.y })
  })

  setInterval(() => {
    myRec.get('pulse').put(Date.now())
  }, 500)

  let player = {
    pub: me.pub,
    pulse: Date.now(),
    x: Math.random(),
    y: Math.random()
  }
  myRec.put(player)
  db.get('playersCount').put(me.num + 1)
}



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