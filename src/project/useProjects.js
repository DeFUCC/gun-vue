import { computed, reactive, ref } from "vue";
import { useGun } from "../gun/composables";
import { currentRoom } from "../room/composables";
import Fuse from "fuse.js";
import { isHash } from "../crypto/composables";

export function useProjects(pub = currentRoom.pub) {
	const search = ref("");
	const projects = reactive({});

	const fuse = computed(() => {
		const list = Object.entries(projects).map((arr) => ({
			...arr[1],
			path: arr[0],
		}));
		return new Fuse(list, {
			includeScore: true,
			ignoreLocation: true,
			keys: ["title"],
		});
	});

	const candidates = computed(() => {
		if (search.value) {
			return fuse.value.search(search.value);
		} else {
			return Object.entries(projects).map((arr) => ({
				item: { ...arr[1], path: arr[0] },
			}));
		}
	});

	const gun = useGun();

	gun
		.user(pub)
		.get("projects")
		.map()
		.on((d, k) => {
			if (d == null) {
				delete projects[k];
				return;
			}
			const data = { ...d, path: k };
			delete data._;
			projects[k] = data;
			if (isHash(data?.cover)) {
				gun
					.get("#cover")
					.get(data.cover)
					.on((d) => (projects[k].cover = d));
			}
		});

	return { projects, search, candidates };
}

export function countProjects(pub = currentRoom.pub) {
	const list = reactive({});
	const gun = useGun();
	gun
		.user(pub)
		.get("projects")
		.map()
		.on((d, k) => {
			if (d == null) {
				delete list[k];
				return;
			}
			list[k] = true;
		});
	return computed(() => Object.keys(list).length);
}
