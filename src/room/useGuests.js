/**
 * @module Guests
 * @group Rooms
 */

import { computed, reactive, watchEffect } from "vue";
import { useGun, useAccount, currentRoom } from "../composables";

/**
 * @typedef {import("../composables").Account} Account
 */

/**
 * @typedef {Object} Guest
 * @property {import("vue").ComputedRef<number>} [order]
 * @property {import("vue").ComputedRef<boolean>} [online]
 * @extends {Account}
 */

let startTime = Date.now();


export function useGuests(roomPub = currentRoom.pub, { TIMEOUT = 10000 } = {}) {
	const gun = useGun();

	/** @type {Object.<string, Guest>} */
	const guests = reactive({});
	const online = reactive({});
	const offline = reactive({});

	const count = reactive({
		total: computed(() => Object.keys(guests).length),
		online: computed(() => Object.keys(online).length),
		offline: computed(() => Object.keys(offline).length),
	});

	gun
		.user(roomPub)
		.get("space")
		.map()
		.once((pos, pub) => {
			const { account } = useAccount(pub);
			guests[pub] = account;
			guests[pub].order = computed(() =>
				startTime - account.value.pulse < TIMEOUT
					? 1
					: startTime - account.value.pulse
			);
			guests[pub].online = computed(() => {
				return startTime - account.value.pulse < TIMEOUT;
			});
		});

	watchEffect(() => {
		for (let pub in guests) {
			if (guests?.[pub]?.online?.value) {
				online[pub] = guests[pub];
				delete offline[pub];
			} else {
				offline[pub] = guests[pub];
				delete online[pub];
			}
		}
	});

	return { guests, online, offline, count };
}
