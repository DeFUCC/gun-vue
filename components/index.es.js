import { reactive$1 as reactive, computed$1 as computed, useNow } from "./vendor.es.js";
import { useGun, useUser, hashObj } from "./useDraw.es.js";
function useGift(hash) {
  const gun = useGun();
  const gift = reactive({});
  gun.get(giftPath).get(hash).once((d, k) => {
    try {
      Object.assign(gift, JSON.parse(d));
      gun.user(gift.from).get(giftPath).get(k).on((d2) => {
        gift.sent = d2;
      });
      gun.user(gift.to).get(giftPath).get(k).on((d2) => {
        gift.received = d2;
      });
    } catch (e) {
    }
  });
  const status = computed(() => gift.sent ? gift.received ? "complete" : "proposed" : "canceled");
  return { gift, status };
}
async function giftState(hash, state = true) {
  const { user } = useUser();
  user.db.get(giftPath).get(hash).put(state);
}
function useNewGift() {
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
const giftPath = "#gifts2025";
export { giftPath, giftState, useGift, useNewGift };
