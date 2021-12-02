import { gun, peers } from "./db";
import { reactive, watch } from "vue";
import ms from "ms";

export function useRelay(host = new URL(peers[0]).hostname) {
  const relay = reactive({
    pulse: 0,
    host,
    started: 0,
    pulse: 0,
    lag: 0,
    diff: computed(() => relay.pulse - relay.started),
    age: computed(() => ms(relay.diff)),
    status: "offline",
    blink: false,
  });

  watch(
    () => relay.pulse,
    (next, prev) => {
      relay.blink = !relay.blink;
      relay.lag = next - prev - 500;
    }
  );

  gun
    .get(host)
    .map()
    .on((d, k) => {
      relay[k] = d;
    });

  return relay;
}
