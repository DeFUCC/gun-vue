/**
 * Read and write zip files
 * @module useZip
 * @see https://github.com/Stuk/jszip
 * */

import JSZip from "jszip";
import { downloadFile, base64Extension, base64FileType } from "./useFile";
import { genUUID, SEA } from "../gun/";
import { createMd } from "./useMd";
import { loadFromHash } from "../posts";

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

  /**
   * Zips the whole post object
   * @param {Object} post
   * @async
   */

  async function zipPost(post = {}) {
    let { icon, cover, content, title, statement } = post;
    delete post?.content;
    if (!title) {
      title = statement ? statement.split(0, 12) : genUUID();
    }

    const files = ["cover", "icon", "text"];

    for (let name of files) {
      let file = await loadFromHash(name, post[name]);
      if (file) {
        const fileName = await addFile({
          title: name,
          file,
          folder: title,
        });
        post.cover = fileName;
      }
    }

    addMd({
      title,
      md: {
        frontmatter: post,
        content,
      },
    });
  }

  async function downloadZip({ title = "", addDate = true } = {}) {
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
