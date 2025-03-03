import { SEA, useGun } from "../composables";
import { useColor } from "../ui/composables";
import { computed, reactive } from "vue";

const colorDeep = useColor("deep");

export const selectedUser = reactive({
	pub: "",
});


export const user = reactive({
	initiated: false,
	auth: false,
	is: null,
	name: "",
	pub: computed(() => user?.is?.pub),
	color: computed(() => (user.pub ? colorDeep.hex(user.pub) : "gray")),
	pulse: 0,
	pulser: null,
	blink: false,
	safe: {
		saved: false,
		password: "",
		enc: "",
		pass: "",
	},
	rooms: {},
	db: undefined,
	pair() {
		console.warn("User pair read externally");
		return pair();
	},
	async encrypt(data) {
		return await SEA.encrypt(data, pair());
	},
	async decrypt(data) {
		return await SEA.decrypt(data, pair());
	},
	async secret(data) {
		return await SEA.secret(data, pair());
	},
});

let pairReads = 0;

function pair() {
	console.log("User pair read", ++pairReads);
	const gun = useGun();
	return gun.user()?._?.sea;
}


export function useUser() {
	if (!user.initiated) {
		const gun = useGun();
		user.db = gun.user();
		gun.user().recall({ sessionStorage: true }, () => {
			console.log("user was recalled");
		});

		gun.on("auth", () => {
			const gun = useGun();
			user.is = gun.user().is;
			if (user.pulser) {
				clearInterval(user.pulser);
			}
			user.pulser = setInterval(() => {
				gun.user().get("pulse").put(Date.now());
			}, 1000);

			gun.user().get("epub").put(user.is.epub);

			gun
				.user()
				.get("pulse")
				.on((d) => {
					user.blink = !user.blink;
					user.pulse = d;
				});

			gun
				.user()
				.get("safe")
				.map()
				.on((d, k) => {
					user.safe[k] = d;
				});

			gun
				.user()
				.get("profile")
				.get("name")
				.on((d) => (user.name = d));

			gun.user().get("my_rooms").map().on(async (d, k) => {
				let decPub = await SEA.decrypt(k, user.pair());
				user.rooms[decPub] = d;
			});

		});
		user.initiated = true;
	}

	return { user, auth, leave };
}


export async function auth(pair, cb = (pair) => { }) {
	const gun = useGun();
	if (!isPair(pair)) {
		console.log("incorrect pair", pair);
		return;
	}
	gun.user().auth(pair, async () => {
		cb(pair);
		console.log("user is authenticated");
	});
}

export function leave() {
	const gun = useGun();
	let is = !!user.is?.pub;
	user.initiated = false;
	clearInterval(user.pulser);
	gun.user().leave();
	setTimeout(() => {
		if (is && !pair()) {
			user.is = null;
			console.info("User logged out");
		}
	}, 500);
}


export function isMine(soul) {
	if (!soul) return;
	return soul.slice(1, 88) == user.pub;
}


export function addProfileField(title) {
	const gun = useGun();
	gun.user().get("profile").get(title).put("");
}

export function updateProfile(field, data) {
	if (field && data !== undefined) {
		const gun = useGun();
		gun.user().get("profile").get(field).put(data);
	}
}

export function isPair(pair) {
	return Boolean(
		pair &&
		typeof pair == "object" &&
		pair.pub &&
		pair.epub &&
		pair.priv &&
		pair.epriv
	);
}
