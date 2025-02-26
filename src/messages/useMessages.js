/**
 * [[include:./messages/README.md]]
 * @module PrivateChat
 * @group Chat
 */

import { reactive, computed, ref } from "vue";
import { useUser, useGun, SEA } from "../composables";
import { computedAsync } from "@vueuse/core";

/**
 * @typedef {Object} Message
 * @property {number} timestamp
 * @property {string} [author]
 * @property {string} text
 */

/**
 * @typedef {Object} Chat
 * @property {string} epub
 * @property {Object.<string, Message>} messages
 * @property {Message[]} [sorted]
 * @property {(message: string) => Promise<void>} send
 */

/**
 * @param {string} pub
 * @returns {Chat}
 */
export function useMessages(pub) {
	const gun = useGun();
	const { user } = useUser();

	const epub = ref("");
	const messages = ref({});
	const sorted = computedAsync(
		async () => Object.entries(messages.value || {}).sort(([, a], [, b]) => (a?.timestamp || 0) - (b?.timestamp || 0)).map(([, msg]) => msg),
		[], // default value while computing
		{ debounce: 200 }
	);

	gun
		.user(pub)
		.get("epub")
		.once((d) => (epub.value = d));

	gun
		.user(pub)
		.get("messages")
		.get(user.pub)
		.map()
		.once(function (_, day) {
			this.map().on(async (d, k) => messages.value[k] = await parseMessage(d, day, pub));
		});

	gun
		.user()
		.get("messages")
		.get(pub)
		.map()
		.once(function (_, day) {
			this.map().on(async (d, k) => messages.value[k] = await parseMessage(d, day, user.pub));
		});


	async function parseMessage(d, today, author) {
		if (typeof d == "number") return;
		if (d && d.startsWith("SEA")) {
			const secret = await user.secret(epub.value);
			const work = await SEA.work(secret, undefined, undefined, {
				salt: today,
			});
			const dec = await SEA.decrypt(d, work);
			if (!dec || typeof dec != "object") return;
			return {
				timestamp: dec.timestamp,
				author,
				text: dec.text,
			};
		}
	}



	/** @type {Chat} */
	const chat = reactive({
		epub,
		messages,
		sorted,
		send: sendMessage
	});

	return chat;
}

/**
 * @param {string} pub
 * @returns {{count: import('vue').ComputedRef<number>, available: import('vue').Ref<boolean>}}
 */
export function useMessagesCount(pub) {
	const gun = useGun();
	const { user } = useUser();
	const messages = reactive({});

	const available = ref(false);

	gun
		.user(pub)
		.get("epub")
		.on((d) => (available.value = d));

	gun
		.user(pub)
		.get("messages")
		.get(user.pub)
		.map()
		.map()
		.on((d, k) => {
			if (d && !d.startsWith("SEA")) return;
			messages[k] = d;
		});

	gun
		.user()
		.get("messages")
		.get(pub)
		.map()
		.map()
		.on((d, k) => {
			if (d && !d.startsWith("SEA")) return;
			messages[k] = d;
		});

	const count = computed(() => {
		return Object.keys(messages).length;
	});
	return { count, available };
}

export async function sendMessage(pub, message) {
	if (!pub || !message) return;

	const gun = useGun();
	const { user } = useUser();
	const theDate = new Date();

	const epub = await gun.user(pub).get("epub").then()

	const today = theDate.toLocaleDateString("en-CA");
	const timestamp = theDate.getTime()
	const secret = await user.secret(epub);
	const work = await SEA.work(secret, undefined, undefined, {
		salt: today,
	});
	const enc = await SEA.encrypt({
		timestamp,
		text: message,
	}, work);

	gun.user().get("messages").get(pub).get(today).set(enc);
}

/**
 * @returns {Object.<string, Message>}
 */
export function useMessagesList() {
	const gun = useGun();
	const { user } = useUser();
	const list = reactive({});
	if (user.is) {
		gun
			.user()
			.get("messages")
			.map()
			.on((d, k) => {
				list[k] = d;
			});

		gun
			.user()
			.get("mates")
			.map()
			.on(async (d, k) => {
				const epub = await gun.user(k).get("epub").then();
				if (epub) {
					list[k] = d;
				}
			});
	}
	return list;
}
