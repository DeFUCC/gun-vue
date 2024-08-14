/**
 * Handle Markdown files
 * @module Md
 * @group Files
 * */

import yamlify from "yamlify-object";
import markdown from "markdown-it";
import externalLinks from "markdown-it-external-links";
import { parse } from "ultramatter";

/**
 * @typedef {Object} MdContent
 * @property {Object} [frontmatter]
 * @property {string} [frontmatter.title]
 * @property {string} [frontmatter.icon]
 * @property {string} [frontmatter.cover]
 * @property {string} [content]
 */

/**
 *  Merge markdown content with a frontmatter object and render to a string
 * @param {MdContent} options
 * @param {Object} [options.frontmatter=null]
 * @param {string} [options.content=""]
 * @returns {string}
 */
export function createMd({ frontmatter = null, content = "" }) {
	let front = "";
	if (
		frontmatter &&
		typeof frontmatter == "object" &&
		Object.keys(frontmatter).length > 0
	) {
		front = yamlify(frontmatter, {
			indent: "",
			prefix: "---\n",
			postfix: "\n---\n",
		});
	}
	return front + content;
}

/**
 * Parse text content of a markdown file into an object
 * @param {string} file - Text form of an uploaded file
 * @returns {MdContent} An object with md frontmatter and content
 */
export function parseMd(file) {
	return parse(file);
}

/** @type {markdown} */
let md;

/**
 * Markdown-it instance to parse MD content
 * @returns {markdown} Markdown-it instance
 */
export function useMd() {
	if (!md) {
		md = new markdown({
			linkify: true,
			typographer: true,
		});

		md.use(externalLinks, {
			externalTarget: "_blank",
		});
	}
	return md;
}
