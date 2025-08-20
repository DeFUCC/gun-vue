
import { SEA } from "../../composables/useGun";
import Dexie from 'dexie';
import { useUser } from "../../composables/useUser";
import { watch, ref } from "vue";

export let db

export const dbInitialized = ref(false)

const { user } = useUser()

watch(() => user.pub, async (pub) => {
    if (!pub) {
        db = null
        dbInitialized.value = false
        return;
    }
    const hash = await SEA.work(user.pub, null, null, { name: "SHA-256" })
    if (db && db.name === `${hash}`) {
        return;
    }
    db = new Dexie(`${hash}`);
    db.version(1).stores({
        repos: 'id, name, createdAt, updatedAt',
    });
    dbInitialized.value = true
}, { immediate: true })
