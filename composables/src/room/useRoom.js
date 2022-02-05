import { useGun } from "@composables";
import { useStorage } from "@vueuse/core";
import { reactive } from "vue";

export const rootRoom = useStorage(
  "root-room",
  "z_ZSOi0ht33klKMIwnvzR6KxSff2ueBceWyDIZY6jM8.Ne9YRZBx-xHEaNDNTHCvJoUWMoyi7CC13S1ZEcrZZqo"
);

export const currentRoom = reactive({});
