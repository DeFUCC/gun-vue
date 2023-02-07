/**
 * @module Guests
 * @group Rooms
 */

import { MaybeComputedRef } from "@vueuse/core";
import { computed, reactive, watchEffect } from "vue";
import { useGun, useAccount, currentRoom, Account } from "../composables";

export interface Guest extends Account {
  order?: MaybeComputedRef<number>
  online?: MaybeComputedRef<boolean>
}

let startTime = Date.now();

export function useGuests({ TIMEOUT = 10000 } = {}) {
  const gun = useGun();

  const guests: Record<string, Guest> = reactive({});
  const online = reactive({});
  const offline = reactive({});

  const count = reactive({
    total: computed(() => Object.keys(guests).length),
    online: computed(() => Object.keys(online).length),
    offline: computed(() => Object.keys(offline).length),
  });

  gun
    .user(currentRoom.pub)
    .get("space")
    .map()
    .once((pos, pub) => {
      const { account } = useAccount(pub);
      guests[pub] = account as Guest;
      guests[pub].order = computed(() =>
        startTime - account.value.pulse < TIMEOUT
          ? 1
          : startTime - account.value.pulse
      );
      guests[pub].online = computed(() => {
        return startTime - account.value.pulse < TIMEOUT;
      });
    });

  watchEffect(() => {
    for (let pub in guests) {
      if (guests[pub].online) {
        online[pub] = guests[pub];
        delete offline[pub];
      } else {
        offline[pub] = guests[pub];
        delete online[pub];
      }
    }
  });

  return { guests, online, offline, count };
}
