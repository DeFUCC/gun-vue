/**
 * @module useRoom
 */

import {
  SEA,
  gun,
  useGun,
  generateCerts,
  useUser,
  user,
  hashText
} from "..";
import { rootRoom } from "./rootRoom";
import { reactive, computed, ref, watchEffect } from "vue";

export const currentRoom = reactive({
  pub: rootRoom.pub,
  isRoot: computed(() => currentRoom.pub == rootRoom.pub),
  hosts: {},
  features: {},
  profile: {},
});

watchEffect(() => {
  const gun = useGun();

  if (currentRoom.pub == rootRoom.pub) {
    currentRoom.hosts = rootRoom.hosts;
    currentRoom.features = rootRoom.features;
  } else {
    currentRoom.features = {};
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
      .get("features")
      .map()
      .once((d, k) => {

        currentRoom.features[k] = d;
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
    features: {},
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
    .get("features")
    .map()
    .once((d, k) => {
      room.features[k] = d;
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

export function useRoomLogo(pub = currentRoom.pub) {

  const logo = ref()

  gun.user(pub).get('profile').get('logo').on(hash => {
    if (!hash) {
      logo.value = null
      return
    }
    gun.get('#logos').get(hash).once(d => {
      logo.value = d
    })
  })

  async function uploadLogo(file) {
    if (file) {
      const hash = await hashText(file)
      gun.get('#logos').get(hash).put(file)
      updateRoomProfile('logo', hash)
    } else {
      removeLogo()
    }

  }

  function removeLogo() {
    updateRoomProfile('logo', null)
  }

  return {
    logo, uploadLogo, removeLogo
  }
}

export function useRooms() {
  const rooms = computed(() => {
    return listPersonal("rooms", currentRoom.pub);
  });
  return { rooms, createRoom };
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

/**
 * Update a profile field of a room
 * @param {String} field parameter to write to
 * @param {String} content
 */

export function updateRoomProfile(field, content) {
  const gun = useGun();
  const { user } = useUser();
  let certificate = currentRoom.hosts?.[user.pub]?.profile;
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
  // if (!pair) pair = await SEA.pair();
  if (!pair) return;

  const certs = await generateCerts({
    pair,
    list: [
      { tag: "profile", users: [user.pub] },
      { tag: "features", users: [user.pub] },
      { tag: "hosts", users: [user.pub] },
    ],
  });
  const features = await generateCerts({
    pair,
    list: [
      { tag: "rooms", personal: true },
      { tag: "space", personal: true },
      { tag: "posts", personal: true },
      { tag: "chat", personal: true },
      { tag: "dict", personal: true },
      { tag: "projects", personal: true },
      { tag: "gifts", personal: true },
    ],
  });

  const enc = await SEA.encrypt(pair, user.pair());
  const dec = await SEA.decrypt(enc, user.pair());

  console.log(
    "COPY THIS ROOM INFO TO USE IT AS A ROOT",
    {
      pub: dec.pub,
      hosts: { [user.pub]: { enc, ...certs } },
      features,
    },
    "STORE THIS KEY PAIR IN A SAFE PLACE",
    dec
  );

  const gun = useGun();
  gun.user().get("safe").get("rooms").get(dec.pub).put(enc);

  gun
    .user(currentRoom.pub)
    .get("rooms")
    .get(`${dec.pub}@${user.pub}`)
    .put(true, null, { opt: { cert: currentRoom?.features?.rooms } });

  const roomDb = gun.user(dec.pub);
  roomDb
    .get("hosts")
    .get(user.pub)
    .put(
      {
        enc,
        ...certs,
      },
      null,
      { opt: { cert: certs.hosts } }
    );
  roomDb.get("features").put(features, null, { opt: { cert: certs.features } });

  if (name) {
    roomDb.get("profile").put({ name }, null, { opt: { cert: certs.profile } });
  }

  // enterRoom(pair.pub);
}

export async function recreateRoom(enc) {
  const dec = await SEA.decrypt(enc, user.pair());
  createRoom({
    pair: dec,
  });
}

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
    .put(!already, null, { opt: { cert: currentRoom.features?.rooms } });
}

export function joinRoom() {
  const gun = useGun();
  gun
    .user(currentRoom.pub)
    .get("space")
    .get(user.pub)
    .put(JSON.stringify({ x: Math.random(), y: Math.random() }), null, {
      opt: { cert: currentRoom.features?.space },
    });
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
  if (!cert) cert = await gun.user(pub).get("features").get(tag).then();
  if (!cert) {
    cert = currentRoom.features?.[`${tag}`];
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
