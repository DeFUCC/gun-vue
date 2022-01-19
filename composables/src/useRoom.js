import { useGun2 } from "./useGun";
import { reactive } from "vue";

export const room = reactive({
  pub: "",
  title: "",
  profile: {},
  host: "",
  hosting: false,
  guests: [],
});

export function useRoom() {
  const gun2 = useGun2();
  gun2.on("auth", async () => {
    room.hosting = true;
  });
}
