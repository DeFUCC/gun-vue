import yaml from "yaml";
import { logEvent } from "./log";
import { gun } from "./gun";
import { hashObj, hashText } from "./hash";
import { downloadText, uploadText } from "./file";

export async function exportFeed(tag, posts) {
  let checkSum = await hashText(posts);
  let yml = yaml.stringify({
    title: tag,
    type: "feed",
    postsHash: checkSum,
    posts: posts,
  });

  downloadText(
    `---
${yml}
---
    `,
    "text/markdown",
    tag + ".md"
  );
}

export function importFeed(tag, event) {
  uploadText(event, (file) => {
    const yamlBlockPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)(?:\n*\s*)(.*)/s;
    const yml = yamlBlockPattern.exec(file.trim());
    const frontmatter = yml[1];
    if (!frontmatter) return;
    let feed = yaml.parse(frontmatter);
    console.log(feed);
    for (let hash in feed?.posts) {
      addPost(tag, feed.posts[hash]);
    }
  });
}

export async function addPost(tag, obj, log = false) {
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
