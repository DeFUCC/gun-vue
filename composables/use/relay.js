import { gun, peers } from "./db";
import { reactive } from "vue";

export function useRelay(url = "etogun.glitch.me") {
  const relay = reactive({
    pulse: 0,
    url: url,
  });

  gun
    .get(url)
    .get("pulse")
    .on((d) => {
      relay.pulse = d;
    });

  return relay;
}
