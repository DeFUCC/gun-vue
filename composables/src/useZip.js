// https://github.com/Stuk/jszip

import JSZip from "jszip";
import { downloadFile, createMd } from "./useFile";

export function useZip() {
  const zip = new JSZip();

  async function addFile({ title, file, folder = "." } = {}) {
    const fileType = file.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
    const extension = file.substring(
      file.indexOf("/") + 1,
      file.indexOf(";base64")
    );
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
