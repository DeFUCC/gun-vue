import yaml from "yaml";
import { logEvent } from "./log";
import { gun } from "./gun";
import { hashObj, hashText } from "./hash";
import { downloadText, createMd, parseMd, uploadText } from "./file";

export async function exportFeed(tag, posts) {
  let checkSum = await hashText(posts);
  downloadText(
    createMd("", {
      title: tag,
      type: "feed",
      postsHash: checkSum,
      posts: posts,
    }),
    "text/markdown",
    tag + ".md"
  );
}

export function importFeed(tag, event) {
  uploadText(event, (file) => {
    let { frontmatter } = parseMd(file);
    for (let hash in frontmatter?.posts) {
      addPost(tag, frontmatter.posts[hash], false);
    }
  });
}

export async function addPost(tag, obj, log = true) {
  const { text, hash } = await hashObj(obj);
  gun.get(`#${tag}`).get(`${hash}`).put(text);
  if (log) {
    logEvent("new-post", {
      event: "new-post",
      feed: tag,
      hash: hash,
    });
  }
}
