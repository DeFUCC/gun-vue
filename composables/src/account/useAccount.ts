/**
 * Basic user management
 * @module useAccount
 * */

export interface Profile {
  name?: string
  first_name?: string
  last_name?: string
  birth_day?: string
  [key: string]: string | undefined
}

export interface Account {
  pub: string | Ref
  color: string
  pulse: number
  blink: boolean
  profile: Profile
  petname?: string
  db?: object
}

import { useGun, useUser, SEA } from "../index.js";
import { useColor } from "../ui/index.js";
import { computed, ComputedRef, reactive, Ref, ref } from "vue";
import ms from "ms";


const colorDeep = useColor("deep");

/**
 * @typedef {computed(object)} account 
 * Reactive account data
 * @property {string} pub   the pub key
 * @property {string} color the color hash of the pub key
 * @property {object} profile all the profile fields of the account
 * @property {number} pulse the recent presence timestamp
 * @property {boolean} blink on/off switching pulse
 * @property {'online' | string} lastSeen a human readable last seen status ('online' if less than TIMEOUT)
 */


/**
 * Load and handle user's account by a public key
 * @param {Ref | string} pub - The public key of a user as a string or a ref
 * @returns {account}
 * @example
 * import { ref } from 'vue'
 * import { useAccount, SEA } from '@gun-vue/composables'
 *
 * const pub = ref()
 *
 * async function generatePair() {
 *  pub.value = await SEA.pair()
 * }
 *
 * const { account } = useAccount(pub)
 * 
 * generatePair()
 */



export function useAccount(pub = ref(), { TIMEOUT = 10000 } = {}) {
  const gun = useGun();
  pub = ref(pub);
  const { user } = useUser()
  const account = computed(() => {

    const acc: Account = reactive({
      pub: pub.value,
      color: computed(() => (pub.value ? colorDeep.hex(pub.value) : "gray")),
      profile: {
        name: "",
      },
      pulse: 0,
      lastSeen: computed(() => {
        const time = Date.now() - acc.pulse;
        if (time > TIMEOUT) {
          return ms(time);
        } else {
          return "online";
        }
      }),
      blink: false,
      db: gun.user(pub.value),
    });

    if (user.is) {
      gun.user().get('petnames').get(pub.value).on(async (d: string) => {
        acc.petname = await SEA.decrypt(d, user.pair())
      })
    }



    gun
      .user(pub.value)
      .get("pulse")
      .on((d) => {
        acc.blink = !acc.blink;
        acc.pulse = d;
      })
      .back()
      .get("profile")
      .map()
      .on((data: string, key: string) => {
        acc.profile[key] = data;
      });
    return acc;
  });

  return { account, setPetname };
}


export async function setPetname(pub: string, name: string) {
  const { user } = useUser()
  if (!user.is) return
  const gun = useGun();
  const enc = await SEA.encrypt(name, user.pair())
  gun.user().get('petnames').get(pub).put(enc)
}