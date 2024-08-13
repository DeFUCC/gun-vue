/**
 * [[include:./private/README.md]]
 * @module PrivateChat
 * @group Chat
 */

import { reactive, computed, ref } from "vue";
import { useUser, useGun, SEA } from "../composables";
import { refDebounced, watchDebounced } from "@vueuse/core";

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
export function usePrivateChat(pub) {
	const gun = useGun();
	const { user } = useUser();

	/** @type {Chat} */
	const chat = reactive({
		epub: "",
		messages: {},
		sorted: [],
		async send(message) {
			if (!message) return;
			const theDate = new Date();
			const toSend = {
				timestamp: theDate.getTime(),
				text: message,
			};
			const today = theDate.toLocaleDateString("en-CA");
			const secret = await user.secret(chat.epub);
			const work = await SEA.work(secret, undefined, undefined, {
				salt: today,
			});
			const enc = await SEA.encrypt(toSend, work);

			gun.user().get("chat").get(pub).get(today).set(enc);
		},
	});

	gun
		.user(pub)
		.get("epub")
		.once((d) => (chat.epub = d));

	gun
		.user(pub)
		.get("chat")
		.get(user.pub)
		.map()
		.once(function (d, k) {
			parseMessages(d, k, pub, this);
		});

	gun
		.user()
		.get("chat")
		.get(pub)
		.map()
		.once(function (d, k) {
			parseMessages(d, k, user.pub, this);
		});

	/**
	 * @param {string} _data
	 * @param {string} today
	 * @param {string} author
	 * @param {any} that
	 */
	function parseMessages(_data, today, author, that) {
		that.map().on(async (d, k) => {
			if (typeof d == "number") return;
			if (d && d.startsWith("SEA")) {
				const secret = await user.secret(chat.epub);
				const work = await SEA.work(secret, undefined, undefined, {
					salt: today,
				});
				const dec = await SEA.decrypt(d, work);
				if (!dec || typeof dec != "object") return;
				const message = {
					timestamp: dec.timestamp,
					author,
					text: dec.text,
				};
				chat.messages[k] = message;
			}
		});
	}

	watchDebounced(
		() => chat.messages,
		(msgs) => {
			chat.sorted = Object.values(chat.messages || {}).sort((a, b) =>
				a?.timestamp > b?.timestamp ? 1 : -1
			);
		},
		{ debounce: 200, immediate: true, deep: true }
	);

	return chat;
}

/**
 * @param {string} pub
 * @returns {{count: import('vue').ComputedRef<number>, available: import('vue').Ref<boolean>}}
 */
export function usePrivateChatCount(pub) {
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
		.get("chat")
		.get(user.pub)
		.map()
		.map()
		.on((d, k) => {
			if (d && !d.startsWith("SEA")) return;
			messages[k] = d;
		});

	gun
		.user()
		.get("chat")
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

/**
 * @returns {Object.<string, Message>}
 */
export function usePrivateChatList() {
	const gun = useGun();
	const { user } = useUser();
	const list = reactive({});
	if (user.is) {
		gun
			.user()
			.get("chat")
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
