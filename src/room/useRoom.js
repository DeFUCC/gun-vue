/**
 * [[include:./room/README.md]]
 * @module Room
 * @group Rooms
 */

/**
 * @module useProject
 * @group Projects
 */
import {
	useGun,
	generateCerts,
	useUser,
	user,
	hashText,
	downloadFile,
	relay,
} from "../composables";
import config from "../../gun.config.json";
import { reactive, computed, ref, watchEffect } from "vue";
import { useStorage } from "@vueuse/core";

const rootRoom = config.room;

/**
 * @typedef {Object} CurrentRoom
 * @property {string} pub
 * @property {boolean} isRoot
 * @property {Object.<string, Object>} [hosts]
 * @property {Object.<string, string>} [features]
 * @property {Object.<string, string>} [profile]
 */

/** @type {CurrentRoom} */
export const currentRoom = reactive({
	pub: useStorage("current-room", rootRoom.pub),
	isRoot: computed(() => currentRoom.pub == rootRoom.pub),
	hosts: {},
	features: {},
	profile: {},
});

watchEffect(() => {
	const gun = useGun();

	if (currentRoom.pub == rootRoom.pub) {
		currentRoom.hosts = rootRoom.hosts;
		currentRoom.features = rootRoom.features;
	} else {
		currentRoom.features = {};
		currentRoom.hosts = {};
		gun
			.user(currentRoom.pub)
			.get("hosts")
			.map()
			.once((d, k) => {
				currentRoom.hosts[k] = d;
			});
		gun
			.user(currentRoom.pub)
			.get("features")
			.map()
			.once((d, k) => {
				currentRoom.features[k] = d;
			});
	}
});

/**
 * Reactive room controls
 * @param {string} [pub=currentRoom.pub]
 * @returns {Object}
 */
export function useRoom(pub = currentRoom.pub) {
	/** @type {CurrentRoom} */
	const room = reactive({
		pub: pub,
		isFavourite: false,
		isRoot: computed(() => pub == rootRoom.pub),
		hosts: {},
		features: {},
		profile: {},
	});

	const gun = useGun();

	gun
		.user(pub)
		.get("profile")
		.map()
		.on((d, k) => {
			room.profile[k] = d;
		});
	gun
		.user(pub)
		.get("hosts")
		.map()
		.once((d, k) => {
			room.hosts[k] = d;
		});
	gun
		.user(pub)
		.get("features")
		.map()
		.once((d, k) => {
			room.features[k] = d;
		});

	gun.user().get('favorite_rooms').get(pub).on((d) => {
		room.isFavourite = d;
	});

	return {
		room,
		submitRoom,
		enterRoom,
		createRoom,
		leaveRoom,
		updateRoomProfile,
	};
}

/**
 * @param {string} [pub=currentRoom.pub]
 * @returns {Object}
 */
export function useRoomLogo(pub = currentRoom.pub) {
	const logo = ref();
	const gun = useGun();
	gun
		.user(pub)
		.get("profile")
		.get("logo")
		.on((hash) => {
			if (!hash) {
				logo.value = null;
				return;
			}
			gun
				.get("#logos")
				.get(hash)
				.once((d) => {
					logo.value = d;
				});
		});

	/**
	 * @param {string} file
	 * @returns {Promise<void>}
	 */
	async function uploadLogo(file) {
		if (file) {
			const hash = await hashText(file);
			gun.get("#logos").get(hash).put(file);
			updateRoomProfile("logo", hash);
		} else {
			removeLogo();
		}
	}

	function removeLogo() {
		updateRoomProfile("logo", null);
	}

	return {
		logo,
		uploadLogo,
		removeLogo,
	};
}

/**
 * @returns {Object}
 */
export function useRooms() {
	const rooms = computed(() => {
		return listPersonal("rooms", currentRoom.pub);
	});
	return { rooms, createRoom };
}

/**
 * @param {string} tag
 * @param {string} [pub=currentRoom.pub]
 * @returns {Object}
 */
export function listPersonal(tag, pub = currentRoom.pub) {
	const gun = useGun();
	const records = reactive({});
	gun
		.user(pub)
		.get(`${tag}`)
		.map()
		.on(function (data, key) {
			let k = key.substring(0, 87);
			records[k] = records[k] || {};
			records[k][key.substring(88)] = data;
		});
	return records;
}

/**
 * Update a profile field of a room
 * @param {string} field - parameter to write to
 * @param {any} content
 */
export function updateRoomProfile(field, content) {
	const gun = useGun();
	const { user } = useUser();
	let certificate = currentRoom.hosts?.[user.pub]?.profile;
	gun
		.user(currentRoom.pub)
		.get("profile")
		.get(field)
		.put(content, null, { opt: { cert: certificate } });
}

/**
 * Create a new room inside the current room
 * @param {Object} options
 * @param {Object} options.pair
 * @param {string} [options.name]
 * @returns {Promise<void>}
 */
export async function createRoom({ pair, name, featureList = Object.keys(config?.features), publish = true } = {}) {
	const { user } = useUser();
	if (!pair) return;
	const roomPub = pair.pub;

	const certs = await generateCerts({
		pair,
		list: [
			{ tag: "profile", users: [user.pub] },
			{ tag: "features", users: [user.pub] },
			{ tag: "hosts", users: [user.pub] },
		],
	});
	const features = await generateCerts({
		pair,
		list: featureList.map((f) => ({
			tag: f,
			personal: true,
		})),
	});

	const enc = await user.encrypt(`${pair}`);

	const gunConfig = {
		...config,
		relay: relay.peer,
		room: {
			pub: pair.pub,
			hosts: { [user.pub]: { enc, ...certs } },
			features,
		},
	};

	console.log(
		"COPY THIS ROOM INFO TO USE IT AS A ROOT",
		gunConfig,
		"STORE THIS KEY PAIR IN A SAFE PLACE",
		pair
	);

	const gun = useGun();
	await gun.user().get("rooms").get(roomPub).put(enc).then();

	await gun
		.user(roomPub)
		.get("hosts")
		.get(user.pub)
		.put(
			{
				enc,
				...certs,
			},
			null,
			{ opt: { cert: certs.hosts } }
		)
		.then();

	await gun
		.user(roomPub)
		.get("features")
		.put(features, null, { opt: { cert: certs.features } })
		.then();

	if (name) {
		await gun
			.user(roomPub)
			.get("profile")
			.put({ name }, null, { opt: { cert: certs.profile } })
			.then();
	}

	if (publish) {
		await gun
			.user(currentRoom.pub)
			.get("rooms")
			.get(`${roomPub}@${user.pub}`)
			.put(true, null, { opt: { cert: currentRoom?.features?.rooms } })
			.then();
	}

	downloadFile(
		JSON.stringify(gunConfig),
		"application/json",
		"gun.config.json"
	);
	downloadFile(
		JSON.stringify(pair),
		"application/json",
		`room_${name || roomPub}.json`
	);
}

/**
 * @param {string} enc
 * @param {string} [name]
 * @returns {Promise<void>}
 */
export async function recreateRoom(enc, name) {
	const dec = await user.decrypt(enc);
	createRoom({
		pair: dec,
		name,
	});
}

/**
 * @param {string} pub
 * @returns {Promise<void>}
 */
export async function submitRoom(pub) {
	const gun = useGun();
	const already = await gun
		.user(currentRoom.pub)
		.get("rooms")
		.get(`${pub}@${user.pub}`)
		.then();

	gun
		.user(currentRoom.pub)
		.get("rooms")
		.get(`${pub}@${user.pub}`)
		.put(!already, null, { opt: { cert: currentRoom.features?.rooms } });
}

export function joinRoom(pub = currentRoom.pub) {
	const gun = useGun();
	gun
		.user(pub)
		.get("space")
		.get(user.pub)
		.put(JSON.stringify({ x: Math.random(), y: Math.random() }), null, {
			opt: { cert: currentRoom.features?.space },
		});
}

export function favRoom(pub = currentRoom.pub, value = true) {
	const gun = useGun();
	gun
		.user()
		.get('favorite_rooms')
		.get(pub)
		.put(value)
}

/**
 * The right way to come inside a room
 * @param {string} pub
 */
export function enterRoom(pub) {
	currentRoom.pub = pub;
}

/**
 * Leave the room
 */
export function leaveRoom() {
	currentRoom.pub = rootRoom.pub;
}


/**
 * @param {Object} options
 * @param {string} options.tag
 * @param {string} options.key
 * @param {string} options.text
 * @param {string} [options.pub=currentRoom.pub]
 * @param {string} [options.cert]
 * @returns {Promise<void>}
 */
export async function addPersonal({
	tag,
	key,
	text,
	pub = currentRoom.pub,
	cert,
}) {
	const gun = useGun();
	if (!cert) cert = await gun.user(pub).get("features").get(tag).then();
	if (!cert) {
		cert = currentRoom.features?.[`${tag}`];
	}
	if (!cert && pub != user.pub) {
		console.log("No certificate found");
		return;
	}

	gun
		.user(pub)
		.get(`${tag}`)
		.get(`${key}@${user.pub}`)
		.put(text, null, { opt: { cert } });
}
