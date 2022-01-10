import { useGun2 } from "./gun";
import { reactive } from "vue";

const { gun2 } = useGun2();

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
