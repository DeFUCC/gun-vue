/**
 * Gift economy
 * @module Gift
 * @group Gift economy
 * */

import { giftPath } from "./composables";
import { useUser } from "../user/composables";
import { reactive, computed, ref, watch } from "vue";
import { hashObj } from "../crypto/composables";
import { useNow } from "@vueuse/core";
import { useGun } from "../gun/composables";
import { computedAsync } from "@vueuse/core";
import { currentRoom } from "../room/composables";

/**
 * @typedef {Object} Gift
 * @property {string} [from]
 * @property {string} [to]
 * @property {number} [qn]
 * @property {string} [ql]
 * @property {string} [wish]
 * @property {string} [project]
 * @property {string} [room]
 * @property {number} [date]
 */

/**
 * @param {string} hash
 * @returns {{gift: Gift, state: Object}}
 */
export function useGift(hash) {
	const gun = useGun();
	/** @type {Gift} */
	const gift = reactive({});
	const state = reactive({
		from: false,
		to: false,
		complete: computed(() => state.from && state.to),
		status: computed(() =>
			state.from ? (state.to ? "complete" : "proposed") : "canceled"
		),
	});
	gun
		.get("#" + giftPath)
		.get(hash)
		.once((d, k) => {
			try {
				Object.assign(gift, JSON.parse(d));
				console.log;
				gun
					.user(gift.from)
					.get(giftPath)
					.get(k)
					.on((d) => {
						state.from = d;
					});
				gun
					.user(gift.to)
					.get(giftPath)
					.get(k)
					.on((d) => {
						state.to = d;
					});
			} catch (e) {
				// gifts[k] = d
			}
		});
	return { gift, state };
}

/**
 * @param {string} hash
 * @param {boolean} [state=true]
 */
export async function giftState(hash, state = true) {
	const { user } = useUser();
	user.db.get(giftPath).get(hash).put(state);
}

/**
 * @param {Gift} giftConf
 * @returns {{gift: Gift, cleanGift: import('vue').ComputedRef, valid: import('vue').ComputedRef, propose: Function, proposed: import('vue').Ref, hash: import('vue').ComputedRef}}
 */
export function useNewGift(giftConf) {
	const { user } = useUser();

	const { now, pause } = useNow({ interval: 1000, controls: true });

	const gift = reactive({
		from: computed(() => user?.pub),
		to: "",
		qn: null,
		ql: null,
		wish: "",
		project: "",
		date: computed(() => now.value.getTime()),
		room: computed(() => currentRoom.pub),
	});

	const cleanGift = computed(() => {
		let g = removeEmptyKeys(gift);
		g.qn = Number(g.qn);
		return g;
	});

	const required = ["from", "to", "qn", "ql"];

	const valid = computed(() => {
		const isFilled = required.reduce((acc, val) => {
			return acc && gift[val];
		}, true);
		return isFilled;
	});

	watch(gift, (g) => {
		if (g.project) {
			gift.to = g.project.slice(-87);
		}
	});

	const hash = computedAsync(async () => {
		const { hash } = await hashObj(cleanGift.value);
		return hash;
	});

	const proposed = ref(false);

	Object.assign(gift, giftConf);

	const gun = useGun();

	async function propose() {
		const { hash, hashed } = await hashObj(cleanGift.value);
		console.log(hash, hashed);

		gun
			.get("#" + giftPath)
			.get(hash)
			.put(hashed);

		gun
			.user()
			.get(giftPath)
			.get(hash)
			.put("proposed", () => {
				pause();
				proposed.value = true;
			});

		if (currentRoom.features?.gifts) {
			gun
				.user(currentRoom.pub)
				.get(giftPath)
				.get(`${hash}@${user.pub}`)
				.put(
					true,
					() => {
						console.log(`gift ${hash} published`);
					},
					{
						opt: { cert: currentRoom.features.gifts },
					}
				);
		}
	}

	return { gift, cleanGift, valid, propose, proposed, hash };
}

/**
 * @param {object} obj
 * @returns {object}
 */
export function removeEmptyKeys(obj) {
	return Object.entries(obj)
		.filter(([_, v]) => {
			_;
			return !!v;
		})
		.reduce(
			(acc, [k, v]) => ({
				...acc,
				[k]: v === Object(v) ? removeEmptyKeys(v) : v,
			}),
			{}
		);
}
