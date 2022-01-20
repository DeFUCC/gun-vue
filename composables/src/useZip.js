/**
 * Read and write zip files
 * @module useZip
 * @see https://github.com/Stuk/jszip
 * */

import JSZip from "jszip";
import { downloadFile, base64Extension, base64FileType } from "./useFile";
import { createMd } from "./useMd";

/**
 * @typedef useZip
 * @property {JSZip} zip - a JSZip instance
 * @property {Function} zipPost - treats a post with md contents and cover and icon images and adds them to the zip
 * @property {Function} addMd - add a MD file to the zip
 * @property {Function} addFile - add a binary file to the zip
 * @property {Function} downloadZip - initiate the download of the zip file
 */

/**
 * Zip file creation toolbox
 * @returns {useZip}
 * @example
 * import {useZip} from '@gun-vue/composables'
 * const { zip, zipPost, addMd, addFile, downloadZip } = useZip()
 */

export function useZip() {
  const zip = new JSZip();

  /**
   * Add a binary file to the zip
   * @async
   * @param {Object} options
   * @returns {String} the resulting filename
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

  async function addFile({ title, file, folder = "." } = {}) {
    const fileType = base64FileType(file);
    const extension = base64Extension(file);
    const blob = await fetch(file).then((res) => res.blob());
    const fileName = `${title}.${extension}`;
    zip.file(`${folder}/${fileName}`, blob, fileType);
    return fileName;
  }

  function addMd({ md, title } = {}) {
    zip.file(`${title}/index.md`, createMd(md), "text/markdown");
  }

  async function zipPost(post = {}) {
    const { icon, cover, content, title } = post;
    delete post?.content;

    if (cover) {
      const fileName = await addFile({
        title: "cover",
        file: cover,
        folder: title,
      });
      post.cover = fileName;
    }

    if (icon) {
      const fileName = await addFile({
        title: "icon",
        file: icon,
        folder: title,
      });
      post.icon = fileName;
    }

    addMd({
      title,
      md: {
        frontmatter: post,
        content,
      },
    });
  }

  async function downloadZip({ title } = {}) {
    const blob = await zip.generateAsync({ type: "blob" });

    let now = new Date();
    const offset = now.getTimezoneOffset();
    now = new Date(now.getTime() - offset * 60 * 1000);

    downloadFile(
      blob,
      "application/zip",
      `${title}-${now.toISOString().split("T")[0]}.zip`
    );
  }

  return { zip, zipPost, addMd, addFile, downloadZip };
}
