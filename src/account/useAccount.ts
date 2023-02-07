/**
 * Basic user management
 * @module Account
 * @group Users
 * */


export interface Profile {
  name?: string
  first_name?: string
  last_name?: string
  birth_day?: string
  [key: string]: string | undefined
}


export interface Account {
  pub?: string
  color?: string
  pulse?: number
  blink?: boolean
  profile?: Profile
  petname?: string
  db?: object
  lastSeen?: string | number
}

import { useGun, useUser, SEA } from "../composables.js";
import { useColor } from "../ui/composables.js";
import { computed, ComputedRef, reactive, Ref, ref } from "vue";
import ms from "ms";
import { MaybeRef } from "@vueuse/core"


const colorDeep = useColor("deep");
const TIMEOUT = 10000

/**
 * Load and handle user's account by a public key
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
export function useAccount(pubKey: MaybeRef<string>): {
  account: ComputedRef<Account>
  setPetname: Function
} {
  const gun = useGun();
  const pub = ref(pubKey);
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