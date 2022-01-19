/**
 * Get and handle a particular post by it's tag and hash
 * @module Post
 */

import { computed, reactive, ref } from "vue";
import ms from "ms";
import { useGun } from "./useGun";

import { createMd } from "./useFile";
import { useZip } from "./useZip";

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
  const gun = useGun();

  tag = ref(tag);
  hash = ref(hash);
  const post = computed(() => {
    const obj = reactive({
      empty: true,
      tag,
      hash,
      data: {},
      download() {
        downloadPost(post);
      },
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

  return post;
}

async function downloadPost(post) {
  post = ref(post);
  let frontmatter = {
    ...post.value.data,
  };

  const { title } = frontmatter;

  const { zipPost, downloadZip } = useZip();

  await zipPost(frontmatter);

  downloadZip({ title });
}
