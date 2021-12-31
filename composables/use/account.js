/**
 * Basic account management
 * @module Account
 * */

/**
 * @typedef {Object} Account - the user account interface
 * @property {Ref} pub - The pub key used to build the account
 * @property {Computed} color - The user account color derived from the pub key
 * @property {Object} profile - An object with all the `gun.user().get('profile')` data
 * @property {Number} pulse - latest timestamp from the user
 * @property {Boolean} blink - A boolean that toggles on every timestamp received
 * @property {gun} db - `gun.user(pub)` ref to query any additional user data
 */

import { gun } from './gun'
import { color } from './color'

/**
 * A user's account
 * @param {Ref} pub - reactive public key in a ref
 * @returns {Account}
 */

export function useAccount(pub = ref()) {
  const account = computed(() => {
    const obj = reactive({
      pub,
      color: computed(() => (pub.value ? color.deep.hex(pub.value) : 'gray')),
      profile: {
        name: '',
      },
      pulse: 0,
      blink: false,
      db: gun.user(pub.value),
    })

    gun
      .user(pub.value)
      .get('pulse')
      .on((d) => {
        obj.blink = !obj.blink
        obj.pulse = d
      })
      .back()
      .get('profile')
      .map()
      .on((data, key) => {
        obj.profile[key] = data
      })
    return obj
  })

  return { account }
}
