/**
 * Basic user management
 * @module useAccount
 * */

import { useGun } from "..";
import { useColor } from "../ui";
import { computed, reactive, ref } from "vue";
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
 * @param {ref(string) | string} pub - The public key of a user as a string or a ref
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
  const account = computed(() => {
    const obj = reactive({
      pub,
      color: computed(() => (pub.value ? colorDeep.hex(pub.value) : "gray")),
      profile: {
        name: "",
      },
      pulse: 0,
      lastSeen: computed(() => {
        let time = Date.now() - obj.pulse;
        if (time > TIMEOUT) {
          return ms(time);
        } else {
          return "online";
        }
      }),
      blink: false,
      db: gun.user(pub.value),
    });

    gun
      .user(pub.value)
      .get("pulse")
      .on((d) => {
        obj.blink = !obj.blink;
        obj.pulse = d;
      })
      .back()
      .get("profile")
      .map()
      .on((data, key) => {
        obj.profile[key] = data;
      });
    return obj;
  });

  return { account };
}