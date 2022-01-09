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
 * @property {Sting} lastSeen - Shows 'online' if recent pulse is less then 10s ago or a human readable time string
 * @property {gun} db - `gun.user(pub)` ref to query any additional user data
 */

import { gun } from "./gun";
import { color } from "./color";
import ms from "ms";

const TIMEOUT = 10000;

/**
 * A user's account
 * @param {Ref} pub - The public key as a string or a ref
 * @returns {Account}
 */

export function useAccount(pub = ref()) {
  if (typeof pub == "string") {
    pub = ref(pub);
  }
  const account = computed(() => {
    const obj = reactive({
      pub,
      color: computed(() => (pub.value ? color.deep.hex(pub.value) : "gray")),
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

export function addProfileField(name) {
  gun.user().get("profile").get(name).put(null);
}
