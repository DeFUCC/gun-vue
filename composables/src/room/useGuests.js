import { computed, ref, reactive, watchEffect } from "vue";
import { useGun, useAccount, getFirstEmoji, currentRoom } from "..";

let startTime = Date.now();

export function useGuests({ TIMEOUT = 10000 } = {}) {
  const gun = useGun();

  const guests = reactive({});
  const online = reactive({});
  const offline = reactive({});

  const count = reactive({
    online: computed(() => Object.keys(online).length),
    offline: computed(() => Object.keys(offline).length),
  });

  gun
    .user(currentRoom.pub)
    .get("space")
    .map()
    .once((pos, pub) => {
      const { account } = useAccount(pub);
      guests[pub] = account;
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
