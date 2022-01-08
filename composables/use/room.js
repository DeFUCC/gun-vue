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

gun2.on("auth", async () => {
  room.hosting = true;
});
