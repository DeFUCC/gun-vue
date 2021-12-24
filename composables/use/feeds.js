import yaml from "yaml";
import { logEvent } from "./log";
import { gun } from "./gun";
import { hashObj } from "./hash";
import { downloadText, uploadText } from "./file";

export function exportFeed(tag, posts) {
  let yml = yaml.stringify({
    title: tag,
    posts: Object.values(posts),
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
    if (Array.isArray(feed?.posts)) {
      feed?.posts.forEach((post) => addPost(tag, post));
    }
  });
}

export async function addPost(tag, obj) {
  const { text, hash } = await hashObj(obj);
  gun.get(`#${tag}`).get(`${hash}`).put(text);
  logEvent("new-post", {
    event: "new-post",
    feed: tag,
    hash: hash,
  });
}
