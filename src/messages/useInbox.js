import { reactive, ref } from "vue";
import { useUser, useGun, SEA } from "../composables";

export function useInbox() {
  const gun = useGun();
  const { user } = useUser();
  const requests = reactive({});
  const loading = ref(false);


  async function sendRequest(toPub, message) {
    if (!user.is || !toPub) return;

    const cert = await gun.user(toPub).get("settings").get("inboxCert").then();

    if (!cert) {
      throw new Error("Recipient has not enabled inbox");
    }

    const request = {
      from: user.pub,
      timestamp: Date.now(),
      message: message || "Would like to chat with you",
    };

    const encrypted = await SEA.encrypt(request, user.sea);

    // Use certificate to write to recipient's inbox
    const certifiedUser = gun.user(toPub).get("inbox");
    await certifiedUser.get(user.pub).put(encrypted, null, { opt: { cert } });
  }

  // Initialize system
  async function init() {
    if (!user.is) return;

    // Create and save inbox certificate
    const cert = await SEA.certify("*", [{ "*": "inbox" }], user.is, null, {
      expiry: undefined,
    });

    await gun.user().get("settings").get("inboxCert").put(cert);

    loading.value = true;

    gun
      .user(user.pub)
      .get("inbox")
      .map()
      .on(async (data, key) => {
        if (!data) {
          delete requests[key];
          return;
        }

        try {
          const decrypted = await SEA.decrypt(data, user.sea);
          if (decrypted && typeof decrypted === "object") {
            requests[key] = {
              ...decrypted,
              id: key,
              timestamp: decrypted.timestamp || Date.now(),
            };
          }
        } catch (e) {
          console.error("Failed to decrypt request:", e);
        }
      });

    loading.value = false;
  }

  // Initialize if user exists
  if (user.is) {
    init();
  }

  return {
    requests,
    loading,
    sendRequest,
  };
}
