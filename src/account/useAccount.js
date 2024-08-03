/**
 * [[include:./account/README.md]]
 * @module Account
 * @group Users
 * */

import { useGun, useUser, SEA } from "../composables";
import { useColor } from "../ui/composables";
import { computed, reactive, ref } from "vue";
import ms from "ms";

const colorDeep = useColor("deep");
const TIMEOUT = 10000;

/**
 * @typedef {Object} Profile
 * @property {string} [name]
 * @property {string} [first_name]
 * @property {string} [last_name]
 * @property {string} [birth_day]
 */

/**
 * @typedef {Object} Account
 * @property {string} [pub]
 * @property {string} [color]
 * @property {number} [pulse]
 * @property {boolean} [blink]
 * @property {Profile} [profile]
 * @property {string} [petname]
 * @property {Object} [db]
 * @property {string|number} [lastSeen]
 */

/**
 * Load and handle user's account by a public key
 * @param {import("@vueuse/core").MaybeRef<string>} pubKey
 * @returns {{account: import("vue").ComputedRef<Account>, setPetname: (pub: string, name: string) => Promise<void>}}
 * @example
 * import { ref } from 'vue'
 * import { useAccount, SEA } from '@gun-vue/composables'
 *
 * const pub = ref()
 *
 * async function generatePair() {
 *  pub.value = await SEA.pair()
 * }
 *
 * const { account } = useAccount(pub)
 *
 * generatePair()
 */
export function useAccount(pubKey) {
	const gun = useGun();
	const pub = ref(pubKey);
	const { user } = useUser();
	const account = computed(() => {
		const acc = reactive({
			pub: pub.value,
			color: computed(() => (pub.value ? colorDeep.hex(pub.value) : "gray")),
			profile: {
				name: "",
			},
			pulse: 0,
			lastSeen: computed(() => {
				const time = Date.now() - acc.pulse;
				if (time > TIMEOUT) {
					return ms(time);
				} else {
					return "online";
				}
			}),
			blink: false,
			db: gun.user(pub.value),
		});

		if (user.is) {
			gun
				.user()
				.get("petnames")
				.get(pub.value)
				.on(async (d) => {
					acc.petname = await user.decrypt(d);
				});
		}

		gun
			.user(pub.value)
			.get("pulse")
			.on((d) => {
				acc.blink = !acc.blink;
				acc.pulse = d;
			})
			.back()
			.get("profile")
			.map()
			.on((data, key) => {
				acc.profile[key] = data;
			});
		return acc;
	});

	return { account, setPetname };
}

/**
 * Set a petname for a user
 * @param {string} pub - Public key of the user
 * @param {string} name - Petname to set
 * @returns {Promise<void>}
 */
export async function setPetname(pub, name) {
	const { user } = useUser();
	if (!user.is) return;
	const gun = useGun();
	const enc = await user.encrypt(name);
	gun.user().get("petnames").get(pub).put(enc);
}
