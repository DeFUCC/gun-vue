import { useGun } from "../composables";
import { ref } from "vue";
import { currentRoom } from "./useRoom";
import { hashText } from "../composables";
import { updateRoomProfile } from "./useRoom";

export function useRoomLogo(pub = currentRoom.pub) {
  const logo = ref();
  const gun = useGun();
  gun
    .user(pub)
    .get("profile")
    .get("logo")
    .once((hash) => {
      if (!hash) {
        logo.value = null;
        return;
      }
      gun
        .get("#logos")
        .get(hash)
        .once((d) => {
          logo.value = d;
        });
    });

  async function uploadLogo(file) {
    if (file) {
      const hash = await hashText(file);
      gun.get("#logos").get(hash).put(file);
      updateRoomProfile("logo", hash);
    } else {
      removeLogo();
    }
  }

  function removeLogo() {
    updateRoomProfile("logo", null);
  }

  return {
    logo,
    uploadLogo,
    removeLogo,
  };
}
