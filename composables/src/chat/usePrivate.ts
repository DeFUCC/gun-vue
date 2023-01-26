/**
 * Basic private chat
 * @module usePrivateChat
 */

import { reactive, computed, ref } from "vue"
import { useUser, useGun, SEA, } from '..'
import { refDebounced } from '@vueuse/core'
import { IGunChain, IGunInstance, IGunSchema } from "gun";
import type { Message } from './useChat'

export function usePrivateChat(pub: string, { parse = true } = {}) {
  parse
  const gun = useGun();
  const { user } = useUser();
  const messages: { [key: string]: Message } = reactive({});
  const epub = ref()

  gun.user(pub)
    .get('epub')
    .once(d => epub.value = d)


  gun.user(pub)
    .get('chat')
    .get(user.pub)
    .map()
    .once(function (d, k) {
      parseMessages(d, k, pub, this)
    })

  gun.user()
    .get('chat')
    .get(pub)
    .map()
    .once(function (d, k) {
      parseMessages(d, k, user.pub, this)
    })

  function parseMessages(_data: string, today: string, author: string, that: IGunChain<string>) {
    that.map().on(async (d: string | number, k: string) => {
      if (typeof d == 'number') return
      if (d && d.startsWith('SEA')) {
        const secret = await SEA.secret(epub.value, user.pair())
        const work = await SEA.work(secret, undefined, undefined, { salt: today })
        const dec = await SEA.decrypt(d, work)
        if (!dec || typeof dec != 'object') return
        const message: Message = {
          timestamp: dec.timestamp,
          author,
          text: dec.text
        }
        messages[k] = message
      }
    })
  }

  async function send(message: string) {
    if (!message) return;
    const theDate = new Date()
    const toSend: Message = {
      timestamp: theDate.getTime(),
      text: message
    }
    const today = theDate.toLocaleDateString('en-CA')
    const secret = await SEA.secret(epub.value, user.pair())
    const work = await SEA.work(secret, undefined, undefined, { salt: today })
    const enc = await SEA.encrypt(toSend, work)

    //@ts-expect-error - Incorrect gun.set() typings
    gun.user().get('chat').get(pub).get(today).set(enc)
  }

  const messageList = computed(() => Object.values(messages || {}))
  const debList = refDebounced(messageList)
  const sorted = computed(() => debList.value.sort((a, b) => a.timestamp > b.timestamp ? 1 : -1))

  return {
    send,
    messages,
    sorted
  };
}


export function usePrivateChatCount(pub: string) {
  const gun = useGun();
  const { user } = useUser();
  const messages: { [key: string]: Message } = reactive({});

  const available = ref(false)

  gun.user(pub).get('epub').on(d => available.value = d)

  gun.user(pub).get('chat').get(user.pub).map().map().on((d, k) => {
    if (d && !d.startsWith('SEA')) return
    messages[k] = d
  })

  gun.user().get('chat').get(pub).map().map().on((d, k) => {
    if (d && !d.startsWith('SEA')) return
    messages[k] = d
  })

  const count = computed(() => {
    return Object.keys(messages).length
  })
  return { count, available }
}

export function usePrivateChatList() {
  const gun = useGun();
  const { user } = useUser();
  const list: { [key: string]: Message } = reactive({})
  if (user.is) {
    gun.user().get('chat').map().on((d, k) => {
      list[k] = d
    })
    gun.user().get("mates").map().on(async (d, k) => {
      const mutual = await gun.user(k).get('mates').get(user.pub).then()
      const epub = await gun.user(k).get('epub').then()
      if (mutual && epub) {
        list[k] = d
      }
    })

  }
  return { list }
}