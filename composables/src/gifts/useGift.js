import { giftPath } from '.'
import { useUser } from '../user'
import { reactive, computed } from 'vue'
import { hashObj } from '../crypto'
import { useNow } from '@vueuse/core'
import { useGun } from '../gun'

export function useGift(hash) {
  const gun = useGun()
  const gift = reactive({})
  const state = reactive({
    sent: false,
    received: false,
    complete: computed(() => state.sent && state.received)
  })
  gun.get(giftPath).get(hash).once((d, k) => {
    try {

      Object.assign(gift, JSON.parse(d))

      gun.user(gift.from).get(giftPath).get(k).on(d => { state.sent = d })
      gun.user(gift.to).get(giftPath).get(k).on(d => { state.received = d })

    } catch (e) {
      // gifts[k] = d
    }

  })
  const status = computed(() => state.sent ? state.received ? 'complete' : 'proposed' : 'canceled')
  return { gift, state, status }
}


export async function giftState(hash, state = true) {
  const { user } = useUser()
  user.db.get(giftPath).get(hash).put(state)
}


export function useNewGift(giftConf) {
  const { user } = useUser()
  const gift = reactive({
    from: computed(() => user?.pub),
    to: '',
    qn: 0,
    ql: '',
    wish: '',
    date: useNow()
  })

  Object.assign(gift, giftConf)

  const gun = useGun()

  async function propose() {

    const { hash, hashed } = await hashObj(gift)
    gun.get(giftPath).get(hash).put(hashed)
    gun.user().get(giftPath).get(hash).put(true)

  }

  return { gift, propose }

}