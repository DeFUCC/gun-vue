/**
 * Connections between accounts
 * @module Mates
 * @group Users
 */

import { reactive, Ref, ref } from "vue";
import { useGun, user } from "../composables";
//@ts-ignore - no types found
import GB from "grapheme-breaker-mjs";

export interface Mate {
	emoji: string
	text: string
	back?: string
}

/**
 * Get a reactive list of the user's mates
 */

export function useMates(pub: string) {
	if (!pub) {
		pub = user.pub;
	}
	const mates: { [key: string]: Mate } = reactive({});
	const gun = useGun();
	gun
		.user(pub)
		.get("mates")
		.map()
		.once((text: string, matePub: string) => {
			if (text) {
				const mate: Mate = {
					emoji: getFirstEmoji(text),
					text,
				}
				mates[matePub] = mate
				gun
					.user(matePub)
					.get("mates")
					.get(pub)
					.on((d) => {
						if (d) {
							mates[matePub].back = getFirstEmoji(d);
						} else {
							delete mates[matePub].back;
						}
					});
			} else {
				delete mates[matePub];
			}
		});
	return mates;
}

/**
 * Break the string into graphemes and return the first one if it's an emoji
 */

export function getFirstEmoji(text: string, def = "👋"): string {
	if (!text || typeof text != "string") return '';
	let em = GB.break(text)[0];
	if (isEmoji(em)) {
		return em;
	} else {
		return def;
	}
}

/**
 * Check if the text has emojis
 */

export function isEmoji(text: string): boolean {
	return /\p{Extended_Pictographic}/u.test(text);
}

/**
 * @typedef {Object} useMate
 * @property {ref} emoji - change it in an input
 * @property {ref} isMate - reactive state of connection
 * @property {Function} toggleMate - toggle the link with current `emoji` ref
 */

/**
 * Make mates with some account by current user
 */

export function useMate(pub: string) {
	const emoji = ref("👋");
	const isMate: Ref<string | boolean> = ref(false);

	const dbMate = user?.db?.get("mates").get(pub);

	dbMate?.on((d) => {
		isMate.value = getFirstEmoji(d);
	});

	function toggleMate() {
		dbMate?.put(isMate.value ? false : getFirstEmoji(emoji.value));
	}
	return { emoji, isMate, toggleMate };
}
