/**
 * Get and handle a particular post by its tag and hash
 * @module Posts
 * @group Posts
 */

import { computed, reactive, ref, shallowReactive } from "vue";

import JSZip from "jszip";

import { detectMimeType, useZip, parseMd, currentRoom } from "../composables";
import { useGun } from "../gun/composables";
import { addPost, usePost } from "./composables";

/**
 * @typedef {Object.<string, Object.<string, string>>} PostList
 */

/**
 * Use a list of immutable data from a #tag
 * @param {string} tag
 * @returns {{
 *   posts: PostList,
 *   backlinks: PostList,
 *   countPosts: import('vue').ComputedRef<number>,
 *   countBacklinks: import('vue').ComputedRef<number>,
 *   downloadPosts: Function,
 *   downloading: import('vue').Ref<boolean>,
 *   uploadPosts: Function
 * }}
 * @example
 * import { usePosts } from '@gun-vue/composables'
 *
 * const { posts, timestamps, count, uploadPosts, downloadPosts} = usePosts('MyTag')
 */
export function usePosts(tag) {
	if (!tag) return;
	const gun = useGun();

	const posts = reactive({});
	const backlinks = reactive({});

	gun
		.user(currentRoom.pub)
		.get("posts")
		.map()
		.on(function (data, key) {
			let index = key.indexOf(tag);
			if (index == -1) return;
			let author = key.slice(-87);
			let from = key.slice(0, 44);
			let to = key.slice(45, 89);
			if (index == 0) {
				posts[to] = posts[to] || {};
				posts[to][author] = data;
			} else {
				backlinks[from] = backlinks[from] || {};
				backlinks[from][author] = data;
			}
		});

	const countPosts = computed(() => {
		let count = 0;
		for (let hash in posts) {
			inner_loop: for (let author in posts[hash]) {
				if (posts[hash][author]) {
					count++;
					break inner_loop;
				}
			}
		}
		return count;
	});

	const countBacklinks = computed(() => {
		let count = 0;
		for (let hash in backlinks) {
			inner_loop: for (let author in backlinks[hash]) {
				if (backlinks[hash][author]) {
					count++;
					break inner_loop;
				}
			}
		}
		return count;
	});

	const downloading = ref(false);

	async function downloadPosts() {
		downloading.value = true;
		downloading.value = !(await downloadFeed(tag, posts));
	}

	function uploadPosts(ev) {
		uploadFeed(tag, ev);
	}

	return {
		posts,
		backlinks,
		countPosts,
		countBacklinks,
		downloadPosts,
		downloading,
		uploadPosts,
	};
}

/**
 * Export a list of posts as a zip file
 * @async
 * @param {string} tag
 * @param {PostList} posts
 * @returns {Promise<boolean>}
 * @example
 * import {downloadFeed} from '@gun-vue/components'
 *
 * downloadFeed('myTag',posts)
 */
export async function downloadFeed(tag, posts) {
	if (!posts) return;

	const { zip, zipPost, downloadZip } = useZip();
	const fullPosts = shallowReactive({});
	for (let hash in posts) {
		const { post } = usePost({ tag, hash });
		fullPosts[hash] = post;
		if (!post.title) continue;
		await zipPost(post);
	}
	await downloadZip({ title: `#${tag}` });
	return true;
}

/**
 * Upload zip files and add all the MD files from it to the tag
 * @param {string} tag
 * @param {FileList} files
 * @example
 * import { uploadFeed } from '@gun-vue/composables'
 * @example @lang html
 * <input type="file" @change="uploadFeed( 'myTag', $event.target.files )" />
 */
export function uploadFeed(tag, files) {
	Array.from(files).forEach(async (file) => {
		const zip = await JSZip.loadAsync(file);
		if (zip.comment) {
			console.info("Zip file comment: " + zip.comment);
		}
		zip.forEach(async (path, entry) => {
			if (path.endsWith("index.md")) {
				let title = path.slice(0, -9);
				let md = await entry.async("string");
				let { frontmatter, content } = parseMd(md);
				frontmatter = frontmatter || {};
				frontmatter.title = frontmatter?.title || title;
				if (frontmatter.icon) {
					const icon = await zip
						.file(`${title}/${frontmatter.icon}`)
						.async("base64");
					const iconMime = detectMimeType(icon);
					frontmatter.icon = `data:${iconMime};base64,${icon}`;
				}
				if (frontmatter.cover) {
					const cover = await zip
						?.file(`${title}/${frontmatter.cover}`)
						?.async("base64");
					const coverMime = detectMimeType(cover);
					frontmatter.cover = `data:${coverMime};base64,${cover}`;
				}
				let post = { ...frontmatter, content };
				addPost(tag, post);
			}
		});
	});
}
