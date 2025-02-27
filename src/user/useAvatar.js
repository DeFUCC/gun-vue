import {
	useUser,
	useGun,
	hashText,

	gunAvatar,
} from "../composables";
import { ref, watch, toRef } from "vue";

/**
 * @typedef {import('@vueuse/core').MaybeRefOrGetter} MaybeRefOrGetter
 */

/**
 * @param {MaybeRefOrGetter<string>} pubKey
 * @param {MaybeRefOrGetter<number>} [picSize=42]
 * @returns {{avatar: import('vue').Ref, blink: import('vue').Ref}}
 */
export function useAvatar(pubKey, picSize = 42) {
	const pub = toRef(pubKey);
	const size = toRef(picSize);

	const avatar = ref();
	const blink = ref();

	const gun = useGun();

	watch(
		pub,
		(p) => {
			avatar.value = gunAvatar({ pub: p, size: size.value * 4 });
		},
		{ immediate: true }
	);

	gun
		.user(pub.value)
		.get("avatar")
		.on((hash) => {
			if (hash) {
				gun
					.get("#avatars")
					.get(hash)
					.once((d) => {
						avatar.value = d;
					});
			}
		});

	gun
		.user(pub.value)
		.get("pulse")
		.on(() => {
			blink.value = !blink.value;
		});

	return {
		avatar,
		blink,
	};
}

/**
 * @typedef {Object} UserAvatarReturn
 * @property {function} remove
 * @property {function(any): Promise<void>} upload
 * @property {import('vue').Ref} avatar
 */

/**
 * @returns {UserAvatarReturn}
 */
export function useUserAvatar() {
	const { user } = useUser();
	const gun = useGun();

	const avatar = ref(null);

	user.db.get("avatar").on((hash) => {
		if (hash) {
			gun
				.get("#avatars")
				.get(hash)
				.once((d) => {
					avatar.value = d;
				});
		} else {
			avatar.value = null;
		}
	});

	/**
	 * @param {any} file
	 */
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
