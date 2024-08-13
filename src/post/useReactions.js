/**
 * Reactions to posts with emojis
 * @module Reactions
 * @group Posts
 */

import { useGun, currentRoom } from '../composables';
import { reactive } from 'vue';

/**
 * @typedef {Object.<string, string>} AuthorList
 */

/**
 * @param {AuthorList} authors
 * @returns {Object.<string, string[]>}
 */
export function useReactions(authors) {
	const reactions = {};
	for (let pub in authors) {
		let reaction = authors[pub];
		if (reaction) {
			reactions[reaction] = reactions[reaction] || [];
			reactions[reaction].push(pub);
		}
	}
	return reactions;
}

/**
 * @param {AuthorList} authors
 * @returns {number}
 */
export function countRating(authors) {
	let count = 0;
	for (let author in authors) {
		if (authors[author] && authors[author] != '🗑') {
			count++;
		} else if (authors[author] == '🗑') {
			count--;
		}
	}
	return count;
}

/**
 * @param {string} pub
 * @returns {import('./usePosts').PostList}
 */
export function useUserPosts(pub) {
	const gun = useGun();
	const posts = reactive({});
	gun.user(currentRoom.pub).get('posts').map().on((d, k) => {
		let author = k.slice(90);
		let from = k.substring(0, 44);
		let to = k.substring(45, 89);
		if (author == pub) {
			if (d) {
				posts[d] = posts[d] || {};
				posts[d][to] = from;
			} else {
				delete posts?.[d]?.[to];
			}
		}
	});
	return posts;
}