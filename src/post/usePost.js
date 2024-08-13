/**
 * Get and handle a particular post by its tag and hash
 * @module Post
 * @group Posts
 */

import { computed, reactive, ref } from "vue";
import ms from "ms";

import {
	useGun,
	currentRoom,
	useUser,
	removeEmptyKeys,
	useZip,
} from "../composables";
import { hashObj, hashText, safeHash } from "../crypto/composables";

/**
 * @typedef {Object} PostContent
 * @property {string} [title]
 * @property {string} [statement]
 * @property {string} [cover]
 * @property {string} [icon]
 * @property {string} [youtube]
 * @property {string} [content]
 * @property {string} [raw]
 * @property {string} [text]
 */

/**
 * @typedef {Object} Post
 * @property {boolean} [empty]
 * @property {string} [tag]
 * @property {string} [hash]
 * @property {PostContent} [data]
 * @property {Function} [download]
 * @property {number} [timestamp]
 * @property {string} [lastUpdated]
 */

/**
 * An interface to manage a post
 * @param {Object} options
 * @param {string} options.hash
 * @param {boolean} [options.loadMedia=true]
 * @returns {{post: PostContent, download: Function, downloading: import('vue').Ref<boolean>}}
 * @example
 * const post = usePost({ tag: 'tag', hash: postHash })
 */
export function usePost({ hash = "", loadMedia = true }) {
	const gun = useGun();

	const post = reactive({});

	gun
		.get("posts")
		.get("#index")
		.get(hash)
		.on(async (d) => {
			try {
				Object.assign(post, JSON.parse(d));
			} catch (e) {
				post.raw = d;
			}
			if (loadMedia) {
				["icon", "cover", "text"].forEach((file) => {
					if (post[file]) {
						gun
							.get("posts")
							.get(`#${file}`)
							.get(post[file])
							.on((data) => {
								post[file] = data;
							});
					}
				});
			}
		});

	const downloading = ref(false);

	async function download() {
		downloading.value = true;
		await downloadPost(post);
		downloading.value = false;
	}
	return { post, download, downloading };
}

/**
 * Add a new post to a tag
 * @param {string} to
 * @param {PostContent} post
 * @example
 * import { addPost } from '@gun-vue/composables'
 *
 * addPost('MyTag', {
 *  title: 'New post'
 * })
 */
export async function addPost(to, post) {
	const gun = useGun();
	const { user } = useUser();
	const { icon, cover, content } = post;
	post.icon = await saveToHash("icon", icon);
	post.cover = await saveToHash("cover", cover);
	post.content = await saveToHash("content", content);
	post = removeEmptyKeys(post);
	const { hashed, hash } = await hashObj(post);
	console.log(hash, post, to);
	gun.get("posts").get("#index").get(`${hash}`).put(hashed);
	gun
		.user(currentRoom.pub)
		.get("posts")
		.get(`${to}:${hash}@${user.pub}`)
		.put(true, null, { opt: { cert: currentRoom.features?.posts } });
}

/**
 * Download the post as a zip file with MD contents and icon and cover pictures if present
 * @param {PostContent} post
 * @returns {Promise<boolean>}
 * @example
 * import { downloadPost, usePost } from '@gun-vue/composables'
 *
 * const {post} = usePost( postTag, postHash )
 *
 * downloadPost(post)
 */
export async function downloadPost(post) {
	let { title } = post;

	const { zipPost, addFile, downloadZip } = useZip();

	if (title && !post.raw) {
		await zipPost({ ...post });
	} else {
		title = "file";
		const hash = await hashText(post.raw);
		await addFile({
			title: safeHash(hash),
			file: post.raw,
		});
	}

	await downloadZip({ title });
	return true;
}

/**
 * @param {string} category
 * @param {string} hash
 * @returns {Promise<string>}
 */
export async function loadFromHash(category, hash) {
	if (
		category &&
		hash &&
		typeof hash == "string" &&
		hash.length == 44 &&
		hash.slice(0, 5) != "data:"
	) {
		const gun = useGun();
		return await gun.get("posts").get(`#${category}`).get(hash).then();
	}
	return hash;
}

/**
 * @param {string} category
 * @param {string} text
 * @returns {Promise<string>}
 */
async function saveToHash(category, text) {
	if (category && text) {
		const hash = await hashText(text);
		const gun = useGun();
		gun.get("posts").get(`#${category}`).get(`${hash}`).put(text);
		return hash;
	} else {
		return text;
	}
}

/**
 * Parse a post string from db
 * @param {string} data
 * @returns {Promise<string>} Post object
 */
export async function parsePost(data) {
	let post;
	try {
		post = JSON.parse(data);
	} catch (e) {
		post = data;
	}
	return post;
}

/**
 * Get and update the timestamp of an immutable post
 * @param {Object} options
 * @param {string} options.hash
 * @returns {{timestamp: import('vue').Ref<number>, msTime: import('vue').ComputedRef<string>, refresh: Function}}
 */
export function usePostTimestamp({ hash }) {
	const gun = useGun();
	const timestamp = ref(0);

	const msTime = computed(() => ms(Date.now() - timestamp.value || 1000));

	gun
		.get("posts")
		.get("#index")
		.get(hash)
		.on(function (d, k, g) {
			timestamp.value = g.put[">"];
		});

	async function refresh() {
		let data = await gun.get("posts").get("#index").get(hash).then();
		gun.get("posts").get("#index").get(hash).put(data);
	}
	return { timestamp, msTime, refresh };
}

