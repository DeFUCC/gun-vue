import { useGun } from "../composables";
import { useSvgMouse } from "../ui/composables";
import { useUser } from "../user/composables";
import { computed, ref, reactive, watchEffect } from "vue";
import { getFirstEmoji, currentRoom } from "../composables";
import { getArrow } from "curved-arrows";
import { useElementBounding, onKeyDown, useKeyModifier } from "@vueuse/core";
import { useClamp } from "@vueuse/math";

export function useSpace({ TIMEOUT = 10000, randomness = 0.1 } = {}) {
	const plane = ref();
	const { area, mouse } = useSvgMouse(plane);

	const { width, height } = useElementBounding(plane);
	const pos = reactive([0, 0]);
	const zoom = useClamp(1, 0.5, 2);

	const gun = useGun();
	const { user } = useUser();

	const space = reactive({
		title: "space",
		joined: false,
		db: computed(() => gun.user(currentRoom.pub).get("space")),
		cert: computed(() => currentRoom.features?.space),
		my: {
			mouse: computed(() => ({ x: mouse.x, y: mouse.y })),
			pos: null,
		},
	});

	async function join() {
		space.joined = true;
	}

	function place({ x = mouse.x, y = mouse.y } = {}) {
		if (!user.pub) return;
		if (!space.joined) join();
		pos[0] = x;
		pos[1] = y;
		space.db
			.get(user.pub)
			.get("pos")
			.put(JSON.stringify({ x, y }), null, {
				opt: { cert: currentRoom.features?.space },
			});
	}

	const shift = useKeyModifier("Shift");

	const step = computed(() => (shift.value ? 100 : 10));

	onKeyDown("ArrowUp", () => {
		place({ x: pos[0], y: pos[1] - step.value });
	});
	onKeyDown("ArrowDown", () => {
		place({ x: pos[0], y: pos[1] + step.value });
	});
	onKeyDown("ArrowLeft", () => {
		place({ x: pos[0] - step.value, y: pos[1] });
	});
	onKeyDown("ArrowRight", () => {
		place({ x: pos[0] + step.value, y: pos[1] });
	});

	function setStatus(status = "") {
		if (!user.pub) return;
		if (!space.joined) join();
		space.db
			.get(user.pub)
			.get("status")
			.put(status, null, {
				opt: { cert: currentRoom.features?.space },
			});
	}

	const allGuests = reactive({});
	const mates = reactive({});
	const links = reactive({});

	const guests = computed(() => {
		const obj = {};
		for (let g in allGuests) {
			if (Date.now() - allGuests[g]?.pulse < TIMEOUT) {
				obj[g] = allGuests[g];
			}
		}
		return obj;
	});

	const guestCount = computed(() => Object.keys(guests.value).length);

	space.db.map().once(async (pos, pub) => {
		if (pub == user.pub) {
			space.joined = true;
		}

		const guest = {
			pub: pub,
			draw: "",
			status: "",
			blink: false,
			pulse: 0,
			hasPos: false,
			pos: {
				x: 0,
				y: 0,
			},
		};
		allGuests[pub] = guest;

		space.db
			.get(pub)
			.get("pos")
			.on((d) => {
				allGuests[pub].hasPos = true;
				allGuests[pub].pos = typeof d == "string" ? JSON.parse(d) : d;
			});

		space.db
			.get(pub)
			.get("draw")
			.on((d) => {
				allGuests[pub].draw = d;
			});

		space.db
			.get(pub)
			.get("status")
			.on((d) => {
				allGuests[pub].status = d;
			});

		gun
			.user(pub)
			.get("pulse")
			.on((d) => {
				allGuests[pub].pulse = Number(d);
				allGuests[pub].blink = !allGuests[pub].blink;
			})
			.back()
			.get("mates")
			.map()
			.on((d, k) => {
				mates[pub] = mates[pub] || {};
				mates[pub][k] = d;
			});
	});

	const seeds = {};

	watchEffect(() => {
		for (let pub1 in mates) {
			seeds[pub1] = seeds[pub1] || {};

			for (let pub2 in mates[pub1]) {
				let seed = (seeds[pub1][pub2] =
					seeds[pub1][pub2] || Math.random() * randomness);

				if (mates[pub1][pub2]) {
					const linkData = mates[pub1][pub2];
					let g1 = allGuests[pub1];
					let g2 = allGuests[pub2];
					let age = Date.now() * 2 - g1?.pulse - g2?.pulse;
					if (g1 && g2 && g1?.hasPos && g2?.hasPos && age < TIMEOUT) {
						links[pub1 + pub2] = {
							user: pub1,
							mate: pub2,
							emoji: getFirstEmoji(linkData),
							from: g1.pos,
							to: g2.pos,
							arrow: generateArrow(g1.pos, g2.pos, seed),
						};
					}
				} else {
					delete links[pub1 + pub2];
				}
			}
		}
	});
	return {
		space,
		allGuests,
		guests,
		guestCount,
		links,
		plane,
		width,
		height,
		pos,
		zoom,
		area,
		join,
		place,
		setStatus,
	};
}


function generateArrow(pos1, pos2, seed = 0) {
	let arrowArray = getArrow(pos1.x, pos1.y, pos2.x, pos2.y, {
		padEnd: 20,
		padStart: 10,
	});
	const [sx, sy, c1x, c1y, c2x, c2y, ex, ey, ae, as] = arrowArray;
	let arrow = {
		sx,
		sy,
		c1x: c1x * (1 - seed + 2 * seed),
		c1y: c1y * (1 - seed + 2 * seed),
		c2x: c2x * (1 - seed + 2 * seed),
		c2y: c2y * (1 - seed + 2 * seed),
		ex,
		ey,
		ae,
		as,
	};
	return arrow;
}

/**
 * @todo draggable handles https://dev.to/abolz/roll-your-own-svg-drag-and-drop-in-vuejs-2c7o
 */
