import { reactive$1 as reactive } from "./vendor.es.js";
import { useUser, useGun, currentRoom, giftPath } from "./useDraw.es.js";
function useGifts() {
  useUser();
  const gun = useGun();
  const gifts = reactive({});
  gun.user(currentRoom.pub).get("gifts").map().once((data, key) => {
    gun.get("#" + giftPath).get(key.slice(0, -88)).once((d, k) => {
      try {
        const obj = JSON.parse(d);
        gifts[k] = obj;
      } catch (e) {
      }
    });
  });
  return { gifts };
}
function useMyGifts() {
  useUser();
  const gun = useGun();
  const gifts = reactive({});
  gun.user().get(giftPath).map().on((d, hash) => {
    gun.get("#" + giftPath).get(hash).once((d2) => {
      try {
        d2 = JSON.parse(d2);
        gifts[hash] = d2;
      } catch {
      }
    });
  });
  return { gifts };
}
function useProjectGifts(path) {
  const pub = path.slice(-87);
  const gun = useGun();
  const gifts = reactive({});
  gun.user(pub).get(giftPath).map().on((d, hash) => {
    gun.get("#" + giftPath).get(hash).once((d2) => {
      try {
        d2 = JSON.parse(d2);
        if (d2.project == path)
          gifts[hash] = d2;
      } catch {
      }
    });
  });
  return { gifts };
}
export { useGifts, useMyGifts, useProjectGifts };
