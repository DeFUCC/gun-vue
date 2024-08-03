/**
 * [[include:./chat/README.md]]
 * @module Chat
 * @group Chat
 */

import { ref, reactive, computed } from "vue";
import slugify from "slugify";
import { useUser, useGun, currentRoom } from "../composables";
import { refDebounced } from "@vueuse/core";

/**
 * @typedef {Object} Message
 * @property {string|number} timestamp
 * @property {string} [author]
 * @property {string} text
 */

/**
 * @typedef {Object.<string, Message>} MessageMap
 */

/**
 * @param {string} [current="general"]
 * @returns {Object}
 */
export function useChat(current = "general") {
	const gun = useGun();
	const { user } = useUser();

	const currentChat = ref(current);

	const chats = computed(() => {
		const chatList = reactive({
			general: {},
		});
		gun
			.user(currentRoom.pub)
			.get("chat")
			.map()
			.on((d, k) => {
				const [title, author] = k.split("@");
				chatList[title] = chatList[title] || {};
				if (d) {
					chatList[title][author] = d;
				} else {
					delete chatList?.[title]?.[author];
				}
			});
		return chatList;
	});

	/**
	 * @param {string} title
	 */
	function addChat(title) {
		gun
			.user(currentRoom.pub)
			.get("chat")
			.get(`${slugify(title) || title}@${user.pub}`)
			.put(true, undefined, { opt: { cert: currentRoom.features.chat } });
	}

	const topicDb = computed(() =>
		gun.user(currentRoom.pub).get("chat/" + currentChat.value)
	);

	const messages = computed(() => {
		const msgs = reactive({});
		topicDb.value.map().on((text, k) => {
			const timestamp = k.substring(0, 13);
			const author = k.substring(14);
			const message = {
				timestamp,
				author,
				text,
			};
			msgs[k] = message;
		});
		return msgs;
	});

	const messageList = computed(() => Object.values(messages.value || {}));
	const debList = refDebounced(messageList);
	const sorted = computed(() =>
		debList.value.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
	);

	/**
	 * @param {string} message
	 */
	function send(message) {
		if (!message) return;
		let now = Date.now();
		topicDb.value
			.get(`${now}@${user.pub}`)
			.put(message, undefined, { opt: { cert: currentRoom.features.chat } });
	}

	return {
		send,
		addChat,
		currentChat,
		chats,
		messages,
		sorted,
	};
}
