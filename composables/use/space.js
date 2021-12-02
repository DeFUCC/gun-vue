import { gun, SEA } from "./db";
import { reactive } from "vue";

export function useSpace(title) {
  const db = gun.get(title);
  const space = reactive({
    title,
    db,
  });

  return space;
}
