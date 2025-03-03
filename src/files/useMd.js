import yamlify from "yamlify-object";
import markdown from "markdown-it";
import externalLinks from "markdown-it-external-links";
import { parse } from "ultramatter";

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

export function parseMd(file) {
	return parse(file);
}


let md;


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
