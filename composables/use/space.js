import { gun, SEA } from "./db";
import { reactive } from "vue";

export function useSpace(title) {
  const space = reactive({
    title,
    db: gun.get(title),
  });

  return space;
}
