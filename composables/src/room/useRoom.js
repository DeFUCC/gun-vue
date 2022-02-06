/**
 * @module Room
 */

import {
  SEA,
  useGun2,
  gun,
  useGun,
  generateCerts,
  useUser,
  user,
  hashObj,
  safeJSONParse,
} from "..";
import { rootAdmin, rootRoom, rootCerts } from "./rootRoom";
import { useStorage } from "@vueuse/core";
import { reactive, computed } from "vue";

export const room = reactive({
  pub: useStorage("root-room", rootRoom),
  isRoot: computed(() => room.pub == rootRoom),
  host: rootAdmin,
  initiated: false,
  hosting: false,
});

export function useRoom() {
  if (!room.initiated) {
    const gun2 = useGun2();

    gun2.on("auth", () => {
      room.hosting = gun2.user()?.is?.pub;
    });
    room.initiated = true;
  }

  const rooms = computed(() => {
    const rs = listRoomItems("#rooms", room.pub);
    return rs;
  });

  const profile = computed(() => {
    const pr = listRoomItems("profile", room.pub);
    return pr;
  });

  return { room, profile, rooms, createRoom, leaveRoom, updateRoomProfile };
}

export function updateRoomProfile(field, content) {
  let cert = rootCerts.profile;
  gun
    .user(room.pub)
    .get("profile")
    .get(field)
    .put(content, null, { opt: { cert } });
}

/**
 * Create a new room inside the current room
 */

export async function createRoom() {
  const pair = await SEA.pair();
  addHashedPersonal("rooms", pair.pub);
  const certs = generateCerts({});
  // room.pub = pair.pub;
}

/**
 * Leave the room
 */

export function leaveRoom() {
  room.pub = rootRoom;
}

/**
 * List room tag items
 * @param {String} tag path to list
 * @param {String} pub room public key
 * @returns {reactive}
 */

export function listRoomItems(tag, pub = room.pub) {
  const gun = useGun();
  const items = reactive({});
  gun
    .get(`~${pub}`)
    .get(tag)
    .map()
    .on((d, k) => {
      items[k] = d;
    });
  return items;
}

export async function addHashedPersonal(tag, obj, pub = room.pub, cert) {
  if (!cert) cert = await gun.get(`~${pub}`).get("cert").get(tag).then();
  if (!cert && pub == rootRoom) {
    cert = rootCerts?.[`#${tag}`];
  }
  if (!cert && pub != user.pub) {
    console.log("No certificate found");
    return;
  }
  const { text, hash } = await hashObj(obj);
  gun
    .get(`~${pub}`)
    .get(`#${tag}`)
    .get(`${hash}@${user.pub}`)
    .put(text, null, { opt: { cert } });
}

export function getHashedPersonal(tag, hash, pub = room.pub) {
  const record = reactive({});
  gun
    .get(`~${pub}`)
    .get(`#${tag}`)
    .map()
    .once(function (data, key) {
      if (key.includes(hash)) {
        record.hash = hash;
        record.tag = tag;
        record.data = safeJSONParse(data);
        record.authors = record.authors || {};
        record.authors[key.slice(-87)] = true;
      }
    });
  return { record };
}
