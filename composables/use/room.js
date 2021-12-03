import { gun2, SEA } from "./gun";
import { reactive } from "vue";

export const room = reactive({
  title: "",
  profile: {},
  team: [],
});

export function useRoom(title) {
  room.title = title;
  return room;
}
