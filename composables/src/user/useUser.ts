/**
 * @module User
 * @group Users
 */

import { gun, useGun } from "..";
import { useColor } from "../ui";
import { computed, reactive } from "vue";
import type { ComputedRef } from 'vue'
import type { IGunInstance, IGunUserInstance, ISEAPair } from 'gun'

const colorDeep = useColor("deep");

export const selectedUser: { pub: string } = reactive({
	pub: '',
});

/**
 * @example
 * { 
 *  "initiated": true, 
 *  "is": { 
 *    "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc", 
 *    "epub": "wAvPlMAg4jvUvK4sPpVyF1CAWnRCMu1YpHnoDrVDg-o.l79QDmdPCLEiO0F_WkB3zYLpJt-lANtyhNmHSM4bTes", 
 *    "alias": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc" 
 *  }, 
 *  "name": "Accord", 
 *  "pub": "XnpLVDYZWdl1NNgo6BlD6e3-n3Fzi-ZzVrzbIgYCYHo.9-hHUHaWNaAE6tMp800MMzNtDLtjicS53915IrBu4uc", 
 *  "color": "#f55c3d", 
 *  "pulse": 1642708061615, 
 *  "pulser": 12, 
 *  "blink": false, 
 *  "safe": { 
 *    "saved": true, 
 *    "password": null, 
 *    "enc": "SEA{\"ct\":\"E+6GViU9dTuidruOCNAoBITE+AlGNRgiABplSbL5fh4v1P+fhF33MuBwKd3ssBNi2kJ1sCzvS/YLmzivECA5ARZPGVbgXTSj8AE9kCz0Ac/8ushlsfBNdt8s3+a3OPVxMIevnT01uqcgr75Zp4TugIg/YuB5WltA9RHsgWEMlo+X+tRGaqG5rfw4sAmTSV0P8evMgM9rN/Un5t/WeDbvIPNXqZEmtxwAhMUZwOJWZckNZmNwpxnelFO0BwmauWfzkXuqGeSxNhMeaZi+VoRDMUvTjT68DLBnVoOhFhcdco+RW8AJfktZHZ4GF2IzFnQmTGpUd2LfvIY/Yn1eNJH7iQ5w41ChiYB/zhgQCOc5ur51PV6swAuN595vUNn7+0J1JRSNGzW2V/4j4YR4IEsAoqOtdn2Y21ga/CFdrE0=\",\"iv\":\"LtODTV+LBzhWHqUcptUO\",\"s\":\"XCL9Uj1YlPcV\"}", 
 *  "pass": "SEA{\"ct\":\"8wNClMx/ebfou+gGWdf+bbx0TAgc9RU=\",\"iv\":\"NPgHkI+Ke+i/mw+3chlr\",\"s\":\"3VzGv06Y4fQ+\"}" 
 *  } 
 * }
 */
export interface User {
	initiated: boolean
	auth: boolean
	is: {
		pub?: string,
		epub?: string,
		alias?: ISEAPair | string
	}
	name: string
	pub: string
	color: string
	pulse: number
	pulser: any
	blink: boolean
	safe: {
		saved: boolean
		password: string
		enc: string
		pass: string
	};
	db?: IGunUserInstance
	pair(): ISEAPair;
}

export const user: User = reactive({
	initiated: false,
	auth: false,
	is: null,
	name: "",
	pub: computed(() => user?.is?.pub) as unknown as string,
	color: computed(() => (user.pub ? colorDeep.hex(user.pub) : "gray")) as unknown as string,
	pulse: 0,
	pulser: null,
	blink: false,
	safe: {
		saved: false,
		password: '',
		enc: '',
		pass: ''
	},
	db: undefined,
	pair(): ISEAPair {
		//@ts-ignore
		return gun?.user?.()?._?.sea;
	},
});



/**
 * Get access to current logged in user
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
	user.is = gun.user().is;
	if (user.pulser) {
		clearInterval(user.pulser);
	}
	user.pulser = setInterval(() => {
		gun.user().get("pulse").put(Date.now());
	}, 1000);

	gun.user().get('epub').put(user.is.epub)

	gun
		.user()
		.get("pulse")
		.on((d) => {
			user.blink = !user.blink;
			user.pulse = d;
		})

	gun.user()
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
 * @example
 * import { auth, SEA } from '@gun-vue/composables'
 *
 * async function login() {
 *    const pair = await SEA.pair()
 *    auth(pair)
 * }
 */

export async function auth(pair: ISEAPair, cb = (pair: ISEAPair) => { }) {
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
	let is = !!user.is?.pub;
	user.initiated = false;
	clearInterval(user.pulser);
	gun.user().leave();
	setTimeout(() => {
		if (is && !user.pair()) {
			user.is = null;
			console.info("User logged out");
		}
	}, 500);
}

export function isMine(soul: string) {
	if (!soul) return;
	return soul.slice(1, 88) == user.pub;
}


/**
 * Add a field to the User profile
 * @example import { addProfileField } from '@gun-vue/composables'

addProfileField( 'city' )
 */
export function addProfileField(title: string) {
	gun.user().get("profile").get(title).put("");
}

/**
 * Update a profile field
 * @example
 * import { updateProfile } from '@gun-vue/composables'
 *
 * updateProfile( 'city', 'Bangkok' )
 */

export function updateProfile(field: string, data: string) {
	if (field && data !== undefined) {
		gun.user().get("profile").get(field).put(data);
	}
}

/**
 * Check if the object is a proper SEA pair
 */

export function isPair(pair: ISEAPair): boolean {
	return Boolean(
		pair &&
		typeof pair == "object" &&
		pair.pub &&
		pair.epub &&
		pair.priv &&
		pair.epriv
	);
}
