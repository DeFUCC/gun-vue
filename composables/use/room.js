import { gun2, SEA } from "./gun";
import { reactive } from "vue";

export const room = reactive({
  pub: "",
  title: "",
  profile: {},
  host: "",
  hosting: false,
  guests: [],
});

export function useRoom(title) {
  room.title = title;
  return room;
}
