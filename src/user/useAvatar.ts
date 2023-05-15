import { useUser, useGun, hashText, useGunPath } from "#composables";
import { ref } from "vue";



export function useAvatar() {
  const { user } = useUser();
  const gun = useGun();

  const avatar = ref(null);

  user.db.get("avatar").on((hash) => {
    if (hash) {
      useGunPath("#avatars", hash).once((d) => {
        avatar.value = d;
      });
    } else {
      avatar.value = null;
    }
  });

  async function upload(file) {
    if (file) {
      const hash = await hashText(file);
      gun.get("#avatars").get(hash).put(file);
      user.db.get("avatar").put(hash);
    } else {
      remove();
    }
  }

  function remove() {
    user.db.get("avatar").put(null);
  }

  return {
    remove,
    upload,
    avatar,
  };
}