import { reactive$1 as reactive } from "./vendor.es.js";
import { useUser, useGun, currentRoom, giftPath } from "./useDraw.es.js";
function useGifts() {
  useUser();
  const gun = useGun();
  const my = reactive({});
  const proposed = reactive({});
  const gifts = reactive({});
  gun.user(currentRoom.pub).get("gifts").map().once((data, key) => {
    gun.get(giftPath).get(key.slice(0, -88)).once((d, k) => {
      try {
        const obj = JSON.parse(d);
        gifts[k] = obj;
      } catch (e) {
      }
    });
  });
  return { my, proposed, gifts };
}
function useMyGifts() {
  const { user } = useUser();
  const gun = useGun();
  const gifts = reactive({});
  const from = reactive({});
  const to = reactive({});
  gun.user().get(giftPath).map().on((d, hash) => {
    gun.get(giftPath).get(hash).once((d2) => {
      try {
        d2 = JSON.parse(d2);
      } catch {
      }
      if (d2.from == user.pub) {
        from[hash] = { ...d2, sent: true };
      }
      if (d2.to == user.pub) {
        to[hash] = { ...d2, sent: true, received: true };
      }
      gifts[hash] = d2;
    });
  });
  return { gifts, to, from };
}
export { useGifts, useMyGifts };
