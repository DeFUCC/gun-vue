import { gun } from './gun'
import { useSvgMouse } from './mouse'
import { user } from './user'
import { hashText } from './hash'
import { logEvent } from './log'

export function useSpace(name = 'public') {
  const space = reactive({
    title: name,
    joined: false,
    db: gun.get(name),
    my: {
      id: null,
      mouse: computed(() => ({ x: mouse.normX, y: mouse.normY })),
      pos: null,
    },
    guests: {},
    mates: {},
  })

  gun
    .user()
    .get(name)
    .get('pos')
    .on((pos) => {
      space.my.pos = pos
    })

  const { area, mouse } = useSvgMouse()

  async function join() {
    if (!gun.user().is) return
    place()
    if (space.joined) return
    const hash = await hashText(user.pub)
    let already = await gun.get(name).get('#guests').get(hash).then()
    if (already) return
    gun.get(name).get('#guests').get(hash).put(user.pub)
    logEvent('guest', { event: 'guest', space: name, pub: user.pub })
    space.joined = true
  }

  gun
    .get(name)
    .get('#guests')
    .map()
    .once(async (pub, hash) => {
      gun
        .user(pub)
        .get('mates')
        .map()
        .on((d, k) => {
          console.log('mates: ', `${pub} & ${k}`, d)
        })

      const hasPos = await gun.user(pub).get(name).get('pos').then()
      space.guests[hash] = {
        pub: pub,
        blink: false,
        pulse: 0,
        hasPos,
        pos: {
          x: 0,
          y: 0,
        },
      }
      gun
        .user(pub)
        .get('pulse')
        .on((d) => {
          space.guests[hash].pulse = d
          space.guests[hash].blink = !space.guests[hash].blink
        })
        .back()
        .get(name)
        .get('pos')
        .map()
        .on((d, k) => {
          space.guests[hash].pos[k] = d
        })
    })

  function place() {
    let pos = { x: mouse.normX, y: mouse.normY }
    gun.user().get(name).get('pos').put(pos)
  }

  return { space, area, join, place }
}
