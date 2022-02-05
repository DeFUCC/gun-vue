import { SEA, useGun2 } from "..";
import { useStorage } from "@vueuse/core";
import { reactive, computed } from "vue";

export const rootRoom =
  "z_ZSOi0ht33klKMIwnvzR6KxSff2ueBceWyDIZY6jM8.Ne9YRZBx-xHEaNDNTHCvJoUWMoyi7CC13S1ZEcrZZqo";

export const room = reactive({
  pub: useStorage("root-room", rootRoom),
  isRoot: computed(() => room.pub == rootRoom),
  hosting: false,
});

export function useRoom(pub = rootRoom) {
  const gun2 = useGun2();
  gun2.on("auth", () => {
    room.hosting = gun2.user()?.is?.pub;
  });
  return { room, createRoom, leaveRoom };
}

export async function createRoom() {
  const pair = await SEA.pair();
  room.pub = pair.pub;
}

export function leaveRoom() {
  room.pub = rootRoom;
}
