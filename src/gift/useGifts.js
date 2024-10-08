/**
 * Gift economy
 * @module Gifts
 * @group Gift economy
 * */

import { reactive, computed } from "vue";
import { useGun, useUser, currentRoom } from "../composables";

import { giftPath } from "./composables";

/**
 * @typedef {import('./useGift').Gift} Gift
 */

/**
 * @typedef {Object.<string, Gift>} GiftList
 */

/**
 * @returns {{gifts: GiftList}}
 */
export function useGifts() {
	const gun = useGun();

	/** @type {GiftList} */
	const gifts = reactive({});

	gun
		.user(currentRoom.pub)
		.get(giftPath)
		.map()
		.once((data, key) => {
			gun
				.get("#" + giftPath)
				.get(key.slice(0, -88))
				.once((d, k) => {
					try {
						const obj = JSON.parse(d);
						gifts[k] = obj;
					} catch (e) {
						// gifts[k] = d
					}
				});
		});

	return { gifts };
}

/**
 * @returns {{gifts: GiftList, from: GiftList, to: GiftList, newGifts: GiftList}}
 */
export function useMyGifts() {
	const { user } = useUser();
	const gun = useGun();
	/** @type {GiftList} */
	const gifts = reactive({});
	/** @type {GiftList} */
	const from = reactive({});
	/** @type {GiftList} */
	const to = reactive({});

	gun
		.user()
		.get(giftPath)
		.map()
		.on((d, hash) => {
			gun
				.get("#" + giftPath)
				.get(hash)
				.once((d) => {
					try {
						d = JSON.parse(d);
						gifts[hash] = d;
						if (d.from == user.pub) {
							from[hash] = d;
						}
						if (d.to == user.pub) {
							to[hash] = d;
						}
					} catch (e) {
						console.log(e);
					}
				});
		});

	/** @type {GiftList} */
	const newGifts = reactive({});

	gun
		.user(currentRoom.pub)
		.get(giftPath)
		.map()
		.once(async (d, path) => {
			let hash = path.slice(0, -88);
			gun
				.get("#" + giftPath)
				.get(hash)
				.once(async (d) => {
					try {
						d = JSON.parse(d);
						if (d.to == user.pub) {
							let has = await gun.user().get(giftPath).get(hash).then();
							if (!has) {
								newGifts[hash] = d;
							}
						}
					} catch (e) {
						console.log(e);
					}
				});
		});

	return { gifts, from, to, newGifts };
}

/**
 * @param {string} path
 * @returns {{gifts: Object, collections: import('vue').ComputedRef}}
 */
export function useProjectGifts(path) {
	const pub = path.slice(-87);
	const gun = useGun();
	const gifts = reactive({});

	gun
		.user(pub)
		.get(giftPath)
		.map()
		.once((d, hash) => {
			gun
				.get("#" + giftPath)
				.get(hash)
				.once((d) => {
					try {
						d = JSON.parse(d);
						if (d.project == path) {
							gifts[hash] = { ...d, state: {} };

							gun
								.user(d.from)
								.get(giftPath)
								.get(hash)
								.on((data) => {
									gifts[hash].state.from = data;
								});
							gun
								.user(d.to)
								.get(giftPath)
								.get(hash)
								.on((data) => {
									gifts[hash].state.to = data;
								});
						}
					} catch (e) {
						console.log(e);
					}
				});
		});

	const collections = computed(() => {
		let collections = {};
		for (let hash in gifts) {
			let gift = gifts[hash];
			collections[gift.ql] = collections[gift.ql] || {
				list: {},
				sum: 0,
				from: {},
			};
			collections[gift.ql].list[hash] = gift;
		}

		for (let q in collections) {
			collections[q].sum = 0;
			collections[q].from = {};

			for (let hash in collections[q].list) {
				let colG = collections[q].list[hash];
				if (!(colG.state.from && colG.state.to)) continue;
				collections[q].sum += Number(colG.qn);
				collections[q].from[colG.from] = collections[q].from[colG.from] || 0;
				collections[q].from[colG.from] += Number(colG.qn);
			}
		}
		return collections;
	});

	return { gifts, collections };
}
