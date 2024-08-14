/**
 * Read and write zip files
 * @module Zip
 * @group Files
 * @see https://github.com/Stuk/jszip
 * */

import JSZip from "jszip";
import { downloadFile, base64Extension, base64FileType } from "./useFile";
import { genUUID } from "../gun/composables";
import { createMd } from "./useMd";
import { loadFromHash } from "../post/composables";

/**
 * @typedef {Object} MdContent
 * @property {Object} frontmatter
 * @property {string} content
 */

/**
 * Zip file creation toolbox
 * @example
 * import { useZip } from '@gun-vue/composables'
 * const { zip, zipPost, addMd, addFile, downloadZip } = useZip()
 * @returns {Object}
 */
export function useZip() {
	const zip = new JSZip();

	/**
	 * Add a binary file to the zip
	 * @async
	 * @param {Object} options
	 * @param {string} options.title
	 * @param {string} options.file
	 * @param {string} [options.folder="."]
	 * @returns {Promise<string>}
	 * @example
	 *  if (post.cover) { // a base64 encoded picture
	 *   const fileName = await addFile({
	 *     title: "cover",
	 *     file: post.cover,
	 *     folder: post.title,
	 *   });
	 *   post.cover = fileName;
	 * }
	 */
	async function addFile({ title, file, folder = "." }) {
		const fileType = base64FileType(file);
		const extension = base64Extension(file);
		const blob = await fetch(file).then((res) => res.blob());
		const fileName = `${title}.${extension}`;
		zip.file(`${folder}/${fileName}`, blob);
		return fileName;
	}

	/**
	 * @param {Object} options
	 * @param {MdContent} options.md
	 * @param {string} options.title
	 */
	function addMd({ md, title }) {
		zip.file(`${title}/index.md`, createMd(md));
	}

	/**
	 * Zips the whole post object
	 * @param {Object} post
	 * @param {string} [post.text]
	 * @param {string} [post.title]
	 * @param {string} [post.statement]
	 * @param {string} [post.content]
	 * @async
	 */
	async function zipPost(post) {
		let { text, title, statement, content } = post;
		delete post?.text;
		delete post?.content;
		if (!title) {
			title = statement ? statement.slice(0, 12) : genUUID();
		}

		const files = ["cover", "icon"];

		for (let type of files) {
			let file = await loadFromHash(type, post[type]);
			if (file) {
				const fileName = await addFile({
					title: type,
					file,
					folder: title,
				});

				post[type] = fileName;
			}
		}

		text = await loadFromHash("text", text);

		addMd({
			title,
			md: {
				frontmatter: post,
				content: text || content,
			},
		});
	}

	/**
	 * @param {Object} [options]
	 * @param {string} [options.title=""]
	 * @returns {Promise<boolean>}
	 */
	async function downloadZip({ title = "" } = {}) {
		let now = new Date();
		const offset = now.getTimezoneOffset();
		now = new Date(now.getTime() - offset * 60 * 1000);
		const date = now.toISOString().split("T")[0];

		const blob = await zip.generateAsync({
			type: "blob",
			comment: `Exported from ${title} at ${location} on ${date}`,
			compression: "DEFLATE",
			compressionOptions: {
				level: 9,
			},
		});

		const fileName = `${title}-${date}.zip`;

		downloadFile(blob, "application/zip", fileName);
		return true;
	}

	return { zip, zipPost, addMd, addFile, downloadZip };
}
