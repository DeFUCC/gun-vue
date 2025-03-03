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


const chatPath = "chat"

/**
 * @param {string} [current="general"]
 * @returns {Object}
 */
export function useChat(current = "general") {
	const gun = useGun();
	const { user } = useUser();

	const currentChat = ref(current);

	const chatVotes = reactive({
		[current]: {
			upvotes: new Set(),
			downvotes: new Set()
		}
	});

	const blockList = reactive({})
	const allowList = reactive({})


	gun
		.user(currentRoom.pub)
		.get(chatPath)
		.map()
		.on((d, k) => {
			const [title, author] = k.split("@");
			if (!chatVotes[title]) {
				chatVotes[title] = {
					upvotes: new Set(),
					downvotes: new Set()
				};
			}

			// Clear both sets for this author first
			chatVotes[title].upvotes.delete(author);
			chatVotes[title].downvotes.delete(author);

			if (d === true) {
				chatVotes[title].upvotes.add(author);
				if (author == user.pub) {
					delete blockList[title];
					allowList[title] = true;
				}
			} else if (d === false) {
				chatVotes[title].downvotes.add(author);
				if (author == user.pub) {
					blockList[title] = true;
					delete allowList[title];
				}
			} else if (d === null && author == user.pub) {
				// When vote is reset to null, remove from both lists
				delete blockList[title];
				delete allowList[title];
			}
		});

	const chats = computed(() => {
		return Object.entries(chatVotes)
			.map(([title, votes]) => ({
				title,
				authors: Array.from(votes.upvotes),
				rating: votes.upvotes.size - votes.downvotes.size,
				my: votes.upvotes.has(user.pub) ? 1 :
					votes.downvotes.has(user.pub) ? -1 : 0
			}))
			.filter(chat =>
				allowList[chat.title] ||
				(!blockList[chat.title] &&
					(chat.rating > 0 || (user.is && chat.my === 0)))
			)
			.sort((a, b) => {
				return b.rating - a.rating;
			});
	});

	/**
	 * @param {string} title
	 */
	async function addChat(title) {
		const prev = await gun
			.user(currentRoom.pub)
			.get(chatPath)
			.get(`${slugify(title)}@${user.pub}`)
			.then();

		// If already upvoted, reset to null, otherwise set to true
		const newValue = prev === true ? null : true;

		gun
			.user(currentRoom.pub)
			.get(chatPath)
			.get(`${slugify(title)}@${user.pub}`)
			.put(newValue, undefined, { opt: { cert: currentRoom.features.chat } });
	}

	async function removeChat(title) {
		const prev = await gun
			.user(currentRoom.pub)
			.get(chatPath)
			.get(`${slugify(title)}@${user.pub}`)
			.then();

		// If already downvoted, reset to null, otherwise set to false
		const newValue = prev === false ? null : false;

		gun
			.user(currentRoom.pub)
			.get(chatPath)
			.get(`${slugify(title)}@${user.pub}`)
			.put(newValue, undefined, { opt: { cert: currentRoom.features.chat } });
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
		removeChat,
		currentChat,
		chats,
		messages,
		sorted,
	};
}
