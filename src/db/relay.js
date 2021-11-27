import { db } from "@db/db";

export const relay = reactive({
  pulse: 0,
});

export function useRelay() {
  onMounted(() => {
    db.get("relay")
      .get("pulse")
      .on((d) => (relay.pulse = d));
  });
  onBeforeUnmount(() => {
    db.get("relay").get("pulse").off();
  });
  return relay;
}
