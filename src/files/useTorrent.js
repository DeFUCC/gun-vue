/**
 * File handling functions
 * @module Torrent
 * @group Files
 * */

// https://github.com/webtorrent/webtorrent/blob/master/docs/api.md#torrentonwire-function-wire-
// https://github.com/webtorrent/parse-torrent

import { ref } from "vue";

/**
 * @param {string} id
 * @returns {{files: import('vue').Ref, stream: import('vue').Ref}}
 */
export function downloadTorrent(id) {
	const files = ref();
	const stream = ref();
	import("webtorrent/dist/webtorrent.min.js").then((lib) => {
		const WebTorrent = lib.default;
		const client = new WebTorrent();
		stream.value = client.add(id, (torrent) => {
			files.value = torrent.files;
		});
	});
	return { files, stream };
}

/**
 * @param {File[]} files
 * @returns {{torrent: import('vue').Ref}}
 */
export function uploadTorrent(files) {
	const torrent = ref();
	import("webtorrent/dist/webtorrent.min.js").then((WebTorrent) => {
		const client = new WebTorrent.default();

		client.seed(files, function (tor) {
			console.log("Client is seeding " + tor.magnetURI);
			torrent.value = tor;
		});
	});
	return { torrent };
}
