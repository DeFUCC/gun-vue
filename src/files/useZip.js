import JSZip from "jszip";
import { downloadFile, base64Extension, base64FileType } from "./useFile";
import { genUUID } from "../gun/composables";
import { createMd } from "./useMd";
import { loadFromHash } from "../post/composables";

export function useZip() {
	const zip = new JSZip();

	async function addFile({ title, file, folder = "." }) {
		const fileType = base64FileType(file);
		const extension = base64Extension(file);
		const blob = await fetch(file).then((res) => res.blob());
		const fileName = `${title}.${extension}`;
		zip.file(`${folder}/${fileName}`, blob);
		return fileName;
	}

	function addMd({ md, title }) {
		zip.file(`${title}/index.md`, createMd(md));
	}

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
