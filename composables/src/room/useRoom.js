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

export const privateCerts = [
  { tag: "profile" },
  { tag: "certs" },
  { tag: "hosts" },
];

export const publicCerts = [
  { tag: "rooms", personal: true },
  { tag: "space", personal: true },
  { tag: "posts", personal: true },
  { tag: "links", personal: true },
];

export const currentRoom = reactive({
  pub: rootRoom.pub,
  isRoot: computed(() => currentRoom.pub == rootRoom.pub),
  hosts: {},
  certs: {},
  profile: {},
});

watchEffect(() => {
  const gun = useGun();
  gun
    .user(currentRoom.pub)
    .get("profile")
    .map()
    .on((d, k) => {
      currentRoom.profile[k] = d;
    });

  if (currentRoom.pub == rootRoom.pub) {
    currentRoom.hosts = rootRoom.hosts;
    currentRoom.certs = rootRoom.certs;
  } else {
    currentRoom.certs = {};
    currentRoom.hosts = {};
    gun
      .user(currentRoom.pub)
      .get("hosts")
      .map()
      .once((d, k) => {
        currentRoom.hosts[k] = d;
      });
    gun
      .user(currentRoom.pub)
      .get("certs")
      .map()
      .once((d, k) => {
        currentRoom.certs[k] = d;
      });
  }
});

/**
 * Reactive room controls
 * @returns {useRoom}
 */

export function useRoom(pub = currentRoom.pub) {
  const room = reactive({
    pub,
    isRoot: pub != rootRoom.pub,
    hosts: {},
    certs: {},
    profile: {},
  });

  const gun = useGun();
  gun
    .user(pub)
    .get("profile")
    .map()
    .on((d, k) => {
      room.profile[k] = d;
    });
  gun
    .user(pub)
    .get("hosts")
    .map()
    .once((d, k) => {
      room.hosts[k] = d;
    });
  gun
    .user(pub)
    .get("certs")
    .map()
    .once((d, k) => {
      room.certs[k] = d;
    });

  return {
    room,
    submitRoom,
    enterRoom,
    createRoom,
    leaveRoom,
    updateRoomProfile,
  };
}

export function useRooms() {
  const rooms = computed(() => {
    return listPersonal("rooms", currentRoom.pub);
  });
  return { rooms, createRoom };
}

/**
 * Update a profile field of a room
 * @param {String} field parameter to write to
 * @param {String} content
 */

export function updateRoomProfile(field, content) {
  const gun = useGun();
  let certificate = currentRoom.certs.profile;
  gun
    .user(currentRoom.pub)
    .get("profile")
    .get(field)
    .put(content, null, { opt: { cert: certificate } });
}

/**
 * Create a new room inside the current room
 */

export async function createRoom({ pair, name } = {}) {
  const { user } = useUser();
  if (!pair) pair = await SEA.pair();
  let certs = await generateRoomCerts(pair);
  const enc = await SEA.encrypt(pair, user.pair());
  const dec = await SEA.decrypt(enc, user.pair());
  console.log(
    { pub: dec.pub, hosts: { [user.pub]: enc }, certs: { ...certs } },
    dec
  );
  const gun = useGun();
  gun.user().get("safe").get("rooms").get(dec.pub).put(enc);

  gun
    .user(currentRoom.pub)
    .get("rooms")
    .get(`${dec.pub}@${user.pub}`)
    .put(true, null, { opt: { cert: currentRoom.certs.rooms } });

  const roomDb = gun.user(dec.pub);
  roomDb.get("certs").put(certs, null, { opt: { cert: certs.certs } });
  roomDb
    .get("hosts")
    .get(user.pub)
    .put(enc, null, { opt: { cert: certs.hosts } });

  if (name) {
    roomDb.get("profile").put({ name }, null, { opt: { cert: certs.profile } });
  }

  // enterRoom(pair.pub);
}

export async function generateRoomCerts(pair) {
  const { user } = useUser();
  const privCerts = [];
  for (let c in privateCerts) {
    privCerts[c] = { ...privateCerts[c], users: [user.pub] };
  }
  return await generateCerts({
    pair,
    list: [...privCerts, ...publicCerts],
  });
}

window.generateRoomCerts = generateRoomCerts;

export async function submitRoom(pub) {
  const gun = useGun();
  const already = await gun
    .user(currentRoom.pub)
    .get("rooms")
    .get(`${pub}@${user.pub}`)
    .then();

  gun
    .user(currentRoom.pub)
    .get("rooms")
    .get(`${pub}@${user.pub}`)
    .put(!already, null, { opt: { cert: currentRoom.certs.rooms } });
}

/**
 * The right way to come inside a room
 * @param {String} pub
 */

export function enterRoom(pub) {
  currentRoom.pub = pub;
}

/**
 * Leave the room
 */

export function leaveRoom() {
  currentRoom.pub = rootRoom.pub;
}

export async function addPersonal({
  tag,
  key,
  text,
  pub = currentRoom.pub,
  cert,
} = {}) {
  if (!cert) cert = await gun.user(pub).get("cert").get(tag).then();
  if (!cert) {
    cert = currentRoom.certs?.[`${tag}`];
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

export function listPersonal(tag, pub = currentRoom.pub) {
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

export async function addHashedPersonal(tag, obj, pub = currentRoom.pub, cert) {
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

export function getHashedPersonal(tag, hash, pub = currentRoom.pub) {
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
