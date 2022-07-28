import { reactive, computed, useNow } from "./vendor.es.js";
import { useUser, useGun, hashObj } from "./useDraw.es.js";
const giftPath = "#gifts2023";
function useGift() {
  const { user } = useUser();
  const gift = reactive({
    from: computed(() => user == null ? void 0 : user.pub),
    to: "",
    qn: 0,
    ql: "",
    wish: "",
    date: useNow()
  });
  const gun = useGun();
  async function propose() {
    const { hash, hashed } = await hashObj(gift);
    gun.get(giftPath).get(hash).put(hashed);
    gun.user().get(giftPath).get(hash).put(true);
  }
  return { gift, propose };
}
async function acceptGift(hash) {
  const { user } = useUser();
  user.db.get(giftPath).get(hash).put(true);
}
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
export { acceptGift, giftPath, useGift, useGifts };
