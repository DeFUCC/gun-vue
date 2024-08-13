/**
 * Get and handle a particular post by its tag and hash
 * @module Tags
 * @group Posts
 */

import { computed, reactive, ref } from "vue";
import slugify from "slugify";
import Fuse from "fuse.js";
import { useGun } from "../gun/composables";
import { hashText } from "../crypto/composables";
import { currentRoom } from "../room/composables";

/**
 * Toolkit to deal with the available tags
 * @returns {{search: import('vue').Ref, slug: import('vue').ComputedRef, tags: Object, addTag: Function}}
 */
export function useTagList() {
	const gun = useGun();

	const search = ref();
	const slug = computed(() => slugify(search.value));

	const tags = reactive({
		list: {},
		all: computed(() => {
			const arr = [];
			for (let t in tags.list) {
				arr.push({
					hash: t,
					tag: tags.list[t],
				});
			}
			return arr.sort((a, b) =>
				a && b && a.tag.toLowerCase() < b.tag.toLowerCase() ? -1 : 1
			);
		}),
		count: computed(() => tags.all.length),
		fuse: computed(() => {
			return new Fuse(tags.all, {
				includeScore: true,
				keys: ["tag"],
			});
		}),
		results: computed(() => {
			if (!search.value) return [];
			let res = tags.fuse.search(slug.value);
			return res;
		}),
		minScore: computed(() => {
			let min = 100;
			tags.results.forEach((res) => {
				if (res.score < min) {
					min = res.score;
				}
			});
			return min;
		}),
	});

	gun
		.get("#tags")
		.map()
		.on((d, k) => {
			if (!d) return;
			try {
				JSON.parse(d); //ignore objects
			} catch (e) {
				tags.list[k] = d; // assumes tag is a plain string
			}
		});

	async function addTag(tag = slug.value) {
		if (!tag) return;
		let safe = slugify(tag);
		const hash = await hashText(safe);
		gun.get(`#tags`).get(`${hash}`).put(safe);
	}

	return { search, slug, tags, addTag };
}

/**
 * @param {string} tag
 * @param {string} [pub]
 * @returns {import('./usePosts').PostList}
 */
export function listPersonalTag(tag, pub = currentRoom.pub) {
	const gun = useGun();
	const records = reactive({});
	gun
		.user(pub)
		.get(`${tag}`)
		.map()
		.on(function (data, key) {
			let k = key.substring(0, 87);
			records[k] = records[k] || {};
			records[k][key.substring(88)] = data;
		});
	return records;
}