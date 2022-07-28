import { giftPath } from '.'
import { useUser } from '../user'
import { reactive, computed } from 'vue'
import { hashObj } from '../crypto'
import { useNow } from '@vueuse/core'
import { useGun } from '../gun'

export function useGift(hash) {
  const gun = useGun()
  const gift = reactive({})
  gun.get(giftPath).get(hash).once((d, k) => {
    try {

      Object.assign(gift, JSON.parse(d))

      gun.user(gift.from).get(giftPath).get(k).on(d => { gift.sent = d })
      gun.user(gift.to).get(giftPath).get(k).on(d => { gift.received = d })

    } catch (e) {
      // gifts[k] = d
    }

  })
  const status = computed(() => gift.sent ? gift.received ? 'complete' : 'proposed' : 'canceled')
  return { gift, status }
}


export async function giftState(hash, state = true) {
  const { user } = useUser()
  user.db.get(giftPath).get(hash).put(state)
}


export function useNewGift() {
  const { user } = useUser()
  const gift = reactive({
    from: computed(() => user?.pub),
    to: '',
    qn: 0,
    ql: '',
    wish: '',
    date: useNow()
  })

  const gun = useGun()

  async function propose() {

    const { hash, hashed } = await hashObj(gift)
    gun.get(giftPath).get(hash).put(hashed)
    gun.user().get(giftPath).get(hash).put(true)

  }

  return { gift, propose }

}