/**
 * Basic private chat
 * @module PrivateChat
 */

import { reactive, computed, ref } from "vue"
import { useAccount, useUser, useGun, SEA } from '..'


export function usePrivateChat(pub, { parse = true } = {}) {

  const gun = useGun();
  const { user } = useUser();
  const messages = reactive({});
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

  function parseMessages(data, today, author, that) {
    that.map().on(async (d, k) => {
      if (d && d.startsWith('SEA')) {
        const secret = await SEA.secret(epub.value, user.pair())
        const work = await SEA.work(secret, today)
        const dec = await SEA.decrypt(d, work)
        if (!dec || typeof dec != 'object') return
        messages[k] = {
          timestamp: dec.timestamp,
          author,
          text: dec.text
        }
      }
    })
  }

  async function send(message) {
    if (!message) return;
    const theDate = new Date()
    const toSend = {
      timestamp: theDate.getTime(),
      text: message
    }
    const today = theDate.toLocaleDateString('en-CA')
    const secret = await SEA.secret(epub.value, user.pair())
    const work = await SEA.work(secret, today)
    const enc = await SEA.encrypt(toSend, work)
    gun.user().get('chat').get(pub).get(today).set(enc)
  }

  return {
    send,
    messages,
  };
}


export function usePrivateChatCount(pub) {
  const gun = useGun();
  const { user } = useUser();
  const messages = reactive({});

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
  const list = reactive({})
  if (user.is) {
    gun.user().get('chat').map().on((d, k) => {
      list[k] = d
    })
    gun.user().get("mates").map().on(async (d, k) => {
      const mutual = await gun.user(k).get('mates').get(user.pub)
      const epub = await gun.user(k).get('epub')
      if (mutual && epub) {
        list[k] = d
      }
    })

  }
  return { list }
}