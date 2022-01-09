/**
 * Get and handle a particular post by it's tag and hash
 * @module Post
 */

import { gun } from "./gun";

import { downloadText, createMd } from "./file";

import ms from "ms";

/**
 * @typedef {Object} Post
 * @property {Boolean} empty - whether the post has contents
 * @property {String} tag - the tag under which the post was published
 * @property {String} hash - the hash of the contents
 * @property {Object} data - the contents of the post
 * @property {Function} download - use this function to download the post as a Markdown file
 */

/**
 *
 * @param {String} tag
 * @param {String} hash
 * @returns {Post}
 */

export function useTagPost(tag = ref(""), hash = ref("")) {
  tag = ref(tag);
  hash = ref(hash);
  const post = computed(() => {
    const obj = reactive({
      empty: true,
      tag,
      hash,
      data: {},
      download,
    });

    gun
      .get(`#${tag.value}`)
      .on((d, k) => {
        obj.timestamp = d._[">"][hash.value];
        if (obj.timestamp) {
          obj.lastUpdated = ms(Date.now() - obj.timestamp);
        }
      })
      .get(hash.value)
      .on(async (d, k) => {
        let banned = await gun.get("#ban").get(k).then();
        if (tag.value != "ban" && banned) return;
        try {
          Object.assign(obj.data, JSON.parse(d));
        } catch (e) {
          obj.data.string = d;
        }
        obj.empty = false;
      });
    return obj;
  });

  async function download() {
    let frontmatter = {
      ...post.value.data,
    };
    delete frontmatter.content;
    downloadText(
      createMd({
        frontmatter,
        content: post.value.data?.content,
      }),
      "text/markdown",
      (post.value.data?.title || "post") + ".md"
    );
  }
  return post;
}
