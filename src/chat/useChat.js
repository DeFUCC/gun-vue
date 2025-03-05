import { ref, reactive, computed } from "vue";
import slugify from "slugify";
import { useUser, useGun, currentRoom } from "../composables";
import { refDebounced } from "@vueuse/core";

export const currentChat = ref("general")
const chatPath = "chat"

export function useChat(current = "general") {
	const gun = useGun();
	const { user } = useUser();
	currentChat.value = current;

	// Track chat votes and lists
	const chatVotes = reactive({});
	const blockList = reactive({});
	const allowList = reactive({});

	// Setup vote tracking
	gun.user(currentRoom.pub)
		.get(chatPath)
		.map()
		.once((d, k) => {
			const [title, author] = k.split("@");
			if (!chatVotes[title]) {
				chatVotes[title] = { upvotes: new Set(), downvotes: new Set() };
			}

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
				delete blockList[title];
				delete allowList[title];
			}
		});

	// Compute sorted chat list
	const chats = computed(() =>
		Object.entries(chatVotes)
			.map(([title, votes]) => ({
				title,
				authors: Array.from(votes.upvotes),
				rating: votes.upvotes.size - votes.downvotes.size,
				my: votes.upvotes.has(user.pub) ? 1 : votes.downvotes.has(user.pub) ? -1 : 0
			}))
			.filter(chat =>
				chat.title == 'general' ||
				allowList[chat.title] ||
				(!blockList[chat.title] && chat.rating >= 0)
			)
			.sort((a, b) => b.rating - a.rating)
	);

	const messages = computed(() => {
		const msgs = reactive({});
		gun.user(currentRoom.pub)
			.get("chat/" + currentChat.value)
			.map()
			.on((text, k) => {
				const timestamp = k.substring(0, 13);
				const author = k.substring(14);
				if (text) {
					msgs[k] = { timestamp, author, text };
				} else {
					delete msgs[k]
				}

			});
		return msgs;
	});

	const sorted = computed(() =>
		refDebounced(computed(() => Object.values(messages.value || {}))).value
			.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
	);

	function send(message) {
		if (!message) return;
		const now = Date.now();
		gun
			.user(currentRoom.pub)
			.get("chat/" + currentChat.value)
			.get(`${now}@${user.pub}`)
			.put(message, undefined, { opt: { cert: currentRoom.features.chat } });
	}

	return {
		send,
		addChat: (title) => voteTopic(title, true),
		removeChat: (title) => voteTopic(title, false),
		currentChat,
		chats,
		messages,
		sorted
	};
}


export async function voteTopic(title, vote = true) {
	const gun = useGun();
	const { user } = useUser();

	const prev = await gun
		.user(currentRoom.pub)
		.get(chatPath)
		.get(`${slugify(title)}@${user.pub}`)
		.then();

	const newValue = prev === vote ? null : vote;

	gun
		.user(currentRoom.pub)
		.get(chatPath)
		.get(`${slugify(title)}@${user.pub}`)
		.put(newValue, undefined, { opt: { cert: currentRoom.features.chat } });
}