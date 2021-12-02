import { gun, SEA } from "./db";
import { reactive } from "vue";

export function useRoom(title, max) {
  export const room = reactive({
    title,
  });
}
