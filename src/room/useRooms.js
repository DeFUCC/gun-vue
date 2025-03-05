import { useGun, useUser } from "../composables";
import { reactive } from "vue";
import { currentRoom } from "./useRoom";

export function useRooms(pub = currentRoom.pub) {
  const gun = useGun();
  const records = reactive({});
  gun
    .user(pub)
    .get('rooms')
    .map()
    .on(function (data, key) {
      let k = key.substring(0, 87);
      records[k] = records[k] || {};
      records[k][key.substring(88)] = data;
    });
  return records;
  return { rooms };
}


export function joinRoom(pub = currentRoom.pub) {
  const gun = useGun();
  const { user } = useUser();
  gun
    .user(pub)
    .get("space")
    .get(user.pub)
    .put(JSON.stringify({ x: Math.random(), y: Math.random() }), null, {
      opt: { cert: currentRoom.features?.space },
    });
}

export async function favRoom(pub = currentRoom.pub) {
  const gun = useGun();
  const { user } = useUser();
  const already = await gun
    .user()
    .get("rooms")
    .get(`${pub}@${user.pub}`)
    .then();

  gun
    .user()
    .get("rooms")
    .get(`${pub}@${user.pub}`)
    .put(!already);
}
