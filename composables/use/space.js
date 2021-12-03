import { gun, SEA } from "./gun";
import { reactive } from "vue";

export let db;
export const space = reactive({
  title: "",
  db,
});

export function useSpace(title) {
  space.db = gun.get(title);
  return space;
}
