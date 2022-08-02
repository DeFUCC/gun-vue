import { useNow } from '@vueuse/core'
import { SEA } from 'gun'
import { reactive, computed } from 'vue'
import { useGun, useUser, hashObj, currentRoom } from '..'

import { giftPath } from '.'

export function useGifts() {
  const { user } = useUser()
  const gun = useGun()

  const gifts = reactive({})

  gun.user(currentRoom.pub).get('gifts').map().once((data, key) => {
    gun.get('#' + giftPath).get(key.slice(0, -88)).once((d, k) => {
      try {
        const obj = JSON.parse(d)
        gifts[k] = obj
      } catch (e) {
        // gifts[k] = d
      }
    })
  })

  return { gifts }
}


export function useMyGifts() {
  const { user } = useUser()
  const gun = useGun()
  const gifts = reactive({})
  gun.user().get(giftPath).map().on((d, hash) => {
    gun.get('#' + giftPath).get(hash).once(d => {
      try {
        d = JSON.parse(d)
        gifts[hash] = d
      } catch { }
    })

  })
  return { gifts }
}

export function useProjectGifts(path) {
  const pub = path.slice(-87)
  const gun = useGun()
  const gifts = reactive({})
  gun.user(pub).get(giftPath).map().on((d, hash) => {
    gun.get('#' + giftPath).get(hash).once(d => {
      try {
        d = JSON.parse(d)
        if (d.project == path)
          gifts[hash] = d
      } catch { }
    })
  })
  return { gifts }
}