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
import { rootRoom } from "./rootRoom";
import { reactive, computed, ref, watchEffect } from "vue";

export const room = reactive({
  pub: rootRoom.pub,
  initiated: false,
  isRoot: computed(() => room.pub == rootRoom.pub),
  host: "",
  certs: {},
});

/**
 * Reactive room controls
 * @returns {useRoom}
 */

export function useRoom(pub) {
  const profile = computed(() => {
    return listRoomItems("profile", room.pub);
  });

  if (!room.inititated) {
    watchEffect(() => {
      if (room.pub == rootRoom.pub) {
        room.host = rootRoom.host;
      } else {
        const gun = useGun();
        gun
          .user(room.pub)
          .get("host")
          .once((d, k) => {
            room.host = d;
          });
      }
    });

    watchEffect(() => {
      if (room.pub == rootRoom.pub) {
        room.certs = rootRoom.certs;
      } else {
        room.certs = {};
        const gun = useGun();
        gun
          .user(room.pub)
          .get("certs")
          .map()
          .once((d, k) => {
            room.certs[k] = d;
          });
      }
    });
    room.initiated = true;
  }

  return {
    room,
    profile,
    submitRoom,
    enterRoom,
    createRoom,
    leaveRoom,
    updateRoomProfile,
  };
}

export function useRooms() {
  const rooms = computed(() => {
    return listPersonal("rooms", room.pub);
  });
  return { rooms, createRoom };
}

export function useRoomProfile(pub = room.pub) {
  const profile = reactive({});
  const gun = useGun();
  gun
    .user(pub)
    .get("profile")
    .map()
    .on((d, k) => {
      profile[k] = d;
    });
  return profile;
}

/**
 * Update a profile field of a room
 * @param {String} field parameter to write to
 * @param {String} content
 */

export function updateRoomProfile(field, content) {
  const gun = useGun();
  let certificate = room.certs.profile;
  gun
    .user(room.pub)
    .get("profile")
    .get(field)
    .put(content, null, { opt: { cert: certificate } });
}

/**
 * Create a new room inside the current room
 */

export async function createRoom({ pair, certs, name } = {}) {
  if (!pair) pair = await SEA.pair();
  if (!certs) certs = await generateRoomCerts(pair);
  addPersonal({ tag: "rooms", key: pair.pub, text: true });
  const gun = useGun();
  const roomDb = gun.user(pair.pub);
  roomDb
    .get("certs")
    .put(certs, null, { opt: { cert: certs.certs } })
    .back()
    .get("host")
    .put(user.pub, null, { opt: { cert: certs.host } });

  if (name) {
    roomDb.get("profile").put({ name }, null, { opt: { cert: certs.profile } });
  }

  const enc = await SEA.encrypt(pair, gun.user()._.sea);
  gun.user().get("safe").get("rooms").get(pair.pub).put(enc);

  let dec = await SEA.decrypt(enc, gun.user()._.sea);
  console.log({ pub: dec.pub, host: user.pub, certs }, pair);
  // enterRoom(pair.pub);
}

export async function generateRoomCerts(pair) {
  return await generateCerts({
    pair,
    list: [
      { tag: "rooms", personal: true },
      { tag: "profile", users: [user.pub] },
      { tag: "certs", users: [user.pub] },
      { tag: "host", users: [user.pub] },
      { tag: "space", personal: true },
      { tag: "posts", personal: true },
      { tag: "links", personal: true },
    ],
  });
}

window.generateRoomCerts = generateRoomCerts;

export async function submitRoom(pub) {
  const gun = useGun();
  const already = await gun
    .user(room.pub)
    .get("rooms")
    .get(`${pub}@${user.pub}`)
    .then();
  addPersonal({ tag: "rooms", key: pub, text: !already });
}

/**
 * The right way to come inside a room
 * @param {String} pub
 */

export function enterRoom(pub) {
  room.pub = pub;
}

/**
 * Leave the room
 */

export function leaveRoom() {
  room.pub = rootRoom.pub;
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
    .user(pub)
    .get(tag)
    .map()
    .on((d, k) => {
      items[k] = d;
    });
  return items;
}

export async function addPersonal({
  tag,
  key,
  text,
  pub = room.pub,
  cert,
} = {}) {
  if (!cert) cert = await gun.user(pub).get("cert").get(tag).then();
  if (!cert) {
    cert = room.certs?.[`${tag}`];
  }
  if (!cert && pub != user.pub) {
    console.log("No certificate found");
    return;
  }
  gun
    .user(pub)
    .get(`${tag}`)
    .get(`${key}@${user.pub}`)
    .put(text, null, { opt: { cert } });
}

export function listPersonal(tag, pub = room.pub) {
  const gun = useGun();
  const records = reactive({});
  gun
    .user(pub)
    .get(`${tag}`)
    .map()
    .on(function (data, key) {
      let k = key.substring(0, 87);
      records[k] = records[k] || {};
      records[k][key.substring(88)] = data;
    });
  return records;
}

export async function addHashedPersonal(tag, obj, pub = room.pub, cert) {
  if (!cert) cert = await gun.get(`~${pub}`).get("cert").get(tag).then();
  if (!cert && pub == rootRoom.pub) {
    cert = rootRoom.certs?.[`#${tag}`];
  }
  if (!cert && pub != user.pub) {
    console.log("No certificate found");
    return;
  }
  const { hashed, hash } = await hashObj(obj);
  gun
    .get(`~${pub}`)
    .get(`#${tag}`)
    .get(`${hash}@${user.pub}`)
    .put(hashed, null, { opt: { cert } });
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
