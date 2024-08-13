/**
 * Connections between accounts!
 * @module Mates
 * @group Users
 */

import { reactive, ref } from "vue";
import { useGun, user } from "../composables";
//@ts-ignore - no types found
import GB from "grapheme-breaker-mjs";

/**
 * @typedef {Object} Mate
 * @property {string} emoji
 * @property {string} text
 * @property {string} [back]
 */

/**
 * Get a reactive list of the user's mates
 * @param {string} pub
 * @returns {Object.<string, Mate>}
 */
export function useMates(pub) {
	if (!pub) {
		pub = user.pub;
	}
	const mates = reactive({});
	const gun = useGun();
	gun
		.user(pub)
		.get("mates")
		.map()
		.once((text, matePub) => {
			if (text) {
				const mate = {
					emoji: getFirstEmoji(text),
					text,
				};
				mates[matePub] = mate;
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
 * @param {string} text
 * @param {string} [def='👋']
 * @returns {string}
 */
export function getFirstEmoji(text, def = "👋") {
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
 * @param {string} text
 * @returns {boolean}
 */
export function isEmoji(text) {
	return /\p{Extended_Pictographic}/u.test(text);
}

/**
 * @typedef {Object} useMateReturn
 * @property {import('vue').Ref<string>} emoji - change it in an input
 * @property {import('vue').Ref<string|boolean>} isMate - reactive state of connection
 * @property {Function} toggleMate - toggle the link with current `emoji` ref
 */

/**
 * Make mates with some account by current user
 * @param {string} pub
 * @returns {useMateReturn}
 */
export function useMate(pub) {
	const emoji = ref("👋");
	const isMate = ref(false);

	const dbMate = user?.db?.get("mates").get(pub);

	dbMate?.on((d) => {
		isMate.value = getFirstEmoji(d);
	});

	function toggleMate() {
		dbMate?.put(isMate.value ? false : getFirstEmoji(emoji.value));
	}
	return { emoji, isMate, toggleMate };
}