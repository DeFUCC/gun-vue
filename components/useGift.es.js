import { useGun, giftPath, useUser, currentRoom, hashObj } from "./useDraw.es.js";
import { reactive$1 as reactive, computed$1 as computed, useNow, watch$1 as watch, computedAsync, ref$1 as ref } from "./vendor.es.js";
function useGift(hash) {
  const gun = useGun();
  const gift = reactive({});
  const state = reactive({
    from: false,
    to: false,
    complete: computed(() => state.from && state.to)
  });
  gun.get(giftPath).get(hash).once((d, k) => {
    try {
      Object.assign(gift, JSON.parse(d));
      gun.user(gift.from).get(giftPath).get(k).on((d2) => {
        state.from = d2;
      });
      gun.user(gift.to).get(giftPath).get(k).on((d2) => {
        state.to = d2;
      });
    } catch (e) {
    }
  });
  const status = computed(() => state.from ? state.to ? "complete" : "proposed" : "canceled");
  return { gift, state, status };
}
async function giftState(hash, state = true) {
  const { user } = useUser();
  user.db.get(giftPath).get(hash).put(state);
}
function useNewGift(giftConf) {
  const { user } = useUser();
  const { now, pause } = useNow({ interval: 1e3, controls: true });
  const gift = reactive({
    from: computed(() => user == null ? void 0 : user.pub),
    to: "",
    qn: 0,
    ql: null,
    wish: "",
    project: "",
    date: computed(() => now.value.toString()),
    room: computed(() => currentRoom.pub)
  });
  const cleanGift = computed(() => removeEmpty(gift));
  const required = ["from", "to", "qn", "ql"];
  const valid = computed(() => {
    return required.reduce((acc, val) => {
      return acc && gift[val];
    }, true);
  });
  watch(gift, (g) => {
    if (g.project) {
      gift.to = g.project.slice(-87);
    }
  });
  const hash = computedAsync(async () => {
    const { hash: hash2, hashed } = await hashObj(gift);
    return hash2;
  });
  const proposed = ref(false);
  Object.assign(gift, giftConf);
  const gun = useGun();
  async function propose() {
    var _a;
    const { hash: hash2, hashed } = await hashObj(cleanGift.value);
    console.log("gift publishing", currentRoom.features);
    if ((_a = currentRoom.features) == null ? void 0 : _a.gifts) {
      console.log("gift published");
      gun.user(currentRoom.pub).get("gifts").get(`${hash2}@${user.pub}`).put(true, null, {
        opt: { cert: currentRoom.features.gifts }
      });
    }
    gun.get(giftPath).get(hash2).put(hashed);
    gun.user().get(giftPath).get(hash2).put("proposed", () => {
      pause();
      proposed.value = true;
    });
  }
  return { gift, cleanGift, valid, propose, proposed, hash };
}
function removeEmpty(obj) {
  return Object.entries(obj).filter(([_, v]) => !!v).reduce((acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? removeEmpty(v) : v }), {});
}
export { giftState, useGift, useNewGift };
