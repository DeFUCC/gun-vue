import { reactive$1 as reactive } from "./vendor.es.js";
import { useUser, useGun } from "./useDraw.es.js";
import { giftPath } from "./index.es2.js";
function useGifts() {
  const { user } = useUser();
  const gun = useGun();
  const my = reactive({});
  const proposed = reactive({});
  const gifts = reactive({});
  gun.get(giftPath).map().once(async (d, k) => {
    try {
      const obj = JSON.parse(d);
      obj.sent = await gun.user(obj.from).get(giftPath).get(k);
      obj.received = await gun.user(obj.to).get(giftPath).get(k);
      if (d.includes(user == null ? void 0 : user.pub)) {
        my[k] = obj;
      }
      if (obj.sent) {
        if (!obj.received)
          proposed[k] = obj;
        else
          gifts[k] = obj;
      }
    } catch (e) {
    }
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
