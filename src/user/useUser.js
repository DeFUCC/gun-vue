/**
 * [[include:./user/README.md]]
 *
 * ## <UserIcon />
 * <UserIcon />
 * @module User
 * @group Users
 */

import { SEA, useGun } from "../composables";
import { useColor } from "../ui/composables";
import { computed, reactive } from "vue";

const colorDeep = useColor("deep");

/**
 * @type {{ pub: string }}
 */
export const selectedUser = reactive({
	pub: "",
});

/**
 * @typedef {Object} User
 * @property {boolean} initiated
 * @property {boolean} auth
 * @property {Object} is
 * @property {string} [is.pub]
 * @property {string} [is.epub]
 * @property {string|Object} [is.alias]
 * @property {string} name
 * @property {string} pub
 * @property {string} color
 * @property {number} pulse
 * @property {any} pulser
 * @property {boolean} blink
 * @property {Object} safe
 * @property {boolean} safe.saved
 * @property {string} safe.password
 * @property {string} safe.enc
 * @property {string} safe.pass
 * @property {Object} safe.rooms
 * @property {Object} [db]
 * @property {function(): Object} pair
 * @property {function(string): Promise<string>} encrypt
 * @property {function(string): Promise<string>} decrypt
 * @property {function(string): Promise<string>} secret
 */

/** @type {User} */
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
		rooms: {},
	},
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

/**
 * @returns {Object}
 */
function pair() {
	console.log("User pair read", ++pairReads);
	const gun = useGun();
	return gun.user()?._?.sea;
}

/**
 * Get access to current logged in user
 * @returns {{user: User, auth: Function, leave: Function}}
 * @example
 * import { useUser } from '@gun-vue/composables'
 *
 * const { user, auth, leave } = useUser()
 */
export function useUser() {
	if (!user.initiated) {
		const gun = useGun();
		user.db = gun.user();
		gun.user().recall({ sessionStorage: true }, () => {
			console.log("user was recalled");
		});

		gun.on("auth", () => {
			init();
			console.log("user authenticated");
		});
		user.initiated = true;
	}

	return { user, auth, leave };
}

function init() {
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

	user.initiated = true;
}

/**
 * Authenticate with a SEA key pair
 * @param {Object} pair - SEA key pair
 * @param {Function} [cb] - Callback function
 * @example
 * import { auth, SEA } from '@gun-vue/composables'
 *
 * async function login() {
 *    const pair = await SEA.pair()
 *    auth(pair)
 * }
 */
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

/**
 * Log out the user
 * @example
 * import { leave } from '@gun-vue/composables'
 *
 * leave()
 **/
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

/**
 * Check if the soul belongs to the current user
 * @param {string} soul
 * @returns {boolean}
 */
export function isMine(soul) {
	if (!soul) return;
	return soul.slice(1, 88) == user.pub;
}

/**
 * Add a field to the User profile
 * @param {string} title - Field title
 * @example
 * import { addProfileField } from '@gun-vue/composables'
 *
 * addProfileField('city')
 */
export function addProfileField(title) {
	const gun = useGun();
	gun.user().get("profile").get(title).put("");
}

/**
 * Update a profile field
 * @param {string} field - Field name
 * @param {string} data - Field value
 * @example
 * import { updateProfile } from '@gun-vue/composables'
 *
 * updateProfile('city', 'Bangkok')
 */
export function updateProfile(field, data) {
	if (field && data !== undefined) {
		const gun = useGun();
		gun.user().get("profile").get(field).put(data);
	}
}

/**
 * Check if the object is a proper SEA pair
 * @param {Object} pair
 * @returns {boolean}
 */
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
