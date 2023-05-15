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
import type { MdContent } from "./useMd";
import { loadFromHash } from "../post/composables";


/**
 * Zip file creation toolbox
 * @example
 * import { useZip } from '@gun-vue/composables'
 * const { zip, zipPost, addMd, addFile, downloadZip } = useZip()
 */

export function useZip() {
  const zip = new JSZip();

  /**
   * Add a binary file to the zip
   * @async
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
  async function addFile({ title, file, folder = "." }: {
    title: string
    file: string
    folder?: string
  }) {
    const fileType = base64FileType(file);
    const extension = base64Extension(file);
    const blob = await fetch(file).then((res) => res.blob());
    const fileName = `${title}.${extension}`;
    zip.file(`${folder}/${fileName}`, blob);
    return fileName;
  }

  function addMd({ md, title }: {
    md: MdContent
    title: string
  }) {
    zip.file(`${title}/index.md`, createMd(md));
  }

  /**
   * Zips the whole post object
   * @param {Object} post
   * @async
   */

  async function zipPost(post: {
    text?: string
    title?: string
    statement?: string
    content?: string
  }) {
    let { text, title, statement, content } = post;
    delete post?.text;
    delete post?.content
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
