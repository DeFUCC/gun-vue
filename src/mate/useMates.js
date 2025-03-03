import { reactive, ref } from "vue";
import { useGun, user } from "../composables";
import GB from "grapheme-breaker-mjs";

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

export function getFirstEmoji(text, def = "👋") {
	if (!text || typeof text != "string") return '';
	let em = GB.break(text)[0];
	if (isEmoji(em)) {
		return em;
	} else {
		return def;
	}
}

export function isEmoji(text) {
	return /\p{Extended_Pictographic}/u.test(text);
}

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