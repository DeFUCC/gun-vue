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

export const selectedRoom = ref(null)

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


export function useRoom(pub = currentRoom.pub) {

	const room = reactive({
		pub: pub,
		isFavourite: false,
		isRoot: computed(() => pub == rootRoom.pub),
		hosts: {},
		features: {},
		profile: {},
	});

	const gun = useGun();
	const { user } = useUser();

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

	gun.user().get('rooms').get(`${pub}@${user?.pub}`).on((d) => {
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

export function updateRoomProfile(field, content) {
	const gun = useGun();
	const { user } = useUser();
	let certificate = currentRoom.hosts?.[user.pub]?.profile;
	if (!certificate) {
		console.warn('Profile certificate not found')
		return
	}
	gun
		.user(currentRoom.pub)
		.get("profile")
		.get(field)
		.put(content, null, { opt: { cert: certificate } });
}

export async function createRoom({
	pair,
	name,
	featureList = Object.keys(config?.features),
	publish = true } = {}) {

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

	const enc = await user.encrypt(pair);
	const encPub = await user.encrypt(roomPub);

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

	await gun.user().get("rooms").get(`${roomPub}@${user.pub}`).put(true).then();

	await gun.user().get("my_rooms").get(encPub).put(enc).then();

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

export async function recreateRoom(enc, name) {
	const dec = await user.decrypt(enc);
	createRoom({
		pair: dec,
		name,
	});
}

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

export function enterRoom(pub) {
	currentRoom.pub = pub;
}

export function leaveRoom() {
	currentRoom.pub = rootRoom.pub;
}
