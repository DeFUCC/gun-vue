import { useGun } from "./composables";
import { computed, reactive, watch } from "vue";
import { useStorage } from "@vueuse/core";
import ms from "ms";

import config from "../../gun.config.json";

const defaultPeer = config.relay;

export const relay = reactive({
	list: [],
	peer: useStorage("peer", defaultPeer),
	hostname: computed(() => new URL(relay.peer)?.hostname || ""),
	status: "offline",
	started: 0,
	pulse: 0,
	lag: 0,
	diff: computed(() => relay.pulse - relay.started),
	age: computed(() => ms(relay.diff)),
	delay: computed(() => Date.now() - relay.pulse),
	blink: false,
});

watch(
	() => relay.pulse,
	(next, prev) => {
		relay.blink = !relay.blink;
		relay.lag = next - prev - 500;
	}
);

export function setPeer(url) {
	relay.peer = url;
	setTimeout(() => {
		window.location.reload(), 700;
	});
}

export function resetPeer() {
	relay.peer = defaultPeer;
	setTimeout(() => {
		window.location.reload(), 700;
	});
}

export function useRelay() {
	const gun = useGun();
	if (relay.pulse == 0 && relay?.hostname) {
		gun
			.get(relay?.hostname)
			.map()
			.on((d, k) => {
				try {
					relay[k] = d;
				} catch (e) {
					console.log(e);
				}
			});
	}

	return { relay, setPeer, resetPeer };
}
