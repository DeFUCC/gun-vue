/**
 * Basic account management
 * @module Account
 * */

import { gun } from "./gun";
import { color } from "./color";

export function useAccount(pub = ref()) {
  const account = computed(() => {
    const obj = reactive({
      pub,
      color: computed(() => (pub.value ? color.deep.hex(pub.value) : "gray")),
      profile: {
        name: "",
      },
      pulse: 0,
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
