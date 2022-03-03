/**
 * Basic user management
 * @module useAccount
 * */

 import {  useGun } from "..";
 import { useColor } from "../ui";
 import { computed, reactive, ref } from "vue";
 import ms from "ms";
 
 const colorDeep = useColor("deep");
 

/**
 * Load and handle user's account by a public key
 * @param {ref} pub - The public key of a user as a string or a ref
 * @returns {Account}
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