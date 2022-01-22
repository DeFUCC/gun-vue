/**
 * Get and handle a particular post by it's tag and hash
 * @module usePost
 */

import { computed, reactive, ref } from "vue";
import ms from "ms";
import { useGun, gun } from "./useGun";
import { useZip } from "./useZip";
import { hashObj, hashText, safeHash } from "./useHash";

/**
 * An interface to manage a post
 * @param {String} tag
 * @param {String} hash
 * @returns {Post}
 * @example
 * const post = usePost( 'tag', postHash )
 */

export function usePost(tag = "null", hash = "") {
  const gun = useGun();

  const post = reactive({
    empty: true,
    downloading: false,
    tag,
    hash,
    data: {},
    async download() {
      post.downloading = true;
      await downloadPost(post);
      post.downloading = false;
    },
  });

  gun
    .get(`#${tag}`)
    .on((d, k) => {
      post.timestamp = d._[">"][hash];
      if (post.timestamp) {
        post.lastUpdated = ms(Date.now() - post.timestamp);
      }
    })
    .get(hash)
    .on(async (d, k) => {
      let banned = await gun.get("#ban").get(k).then();
      if (tag != "ban" && banned) return;
      try {
        Object.assign(post.data, JSON.parse(d));
      } catch (e) {
        post.data.base64 = d;
      }
      post.empty = false;
    });

  return post;
}

/**
 * @typedef {Object} Post
 * @property {Boolean} empty - whether the post has contents
 * @property {String} tag - the tag under which the post was published
 * @property {String} hash - the hash of the contents
 * @property {Object} data - the contents of the post
 * @property {Function} download - use this function to download the post as a Markdown file
 * @example
 * {
 *  "empty": false,
 *  "tag": "ds",
 *  "hash": "C8trDBYNyvxVedHK4Q0IuUarc/k2/iiv8opPfoAU0xA=",
 *  "data": {
 *    "cover": "data:image/png;base64,..........",
 *    "icon": "data:image/png;base64,..........",
 *    "title": "OSS",
 *    "description": "New live album by tsoop",
 *    "youtube": "K2MwpOd8vEI",
 *    "content": "It's mostly op-z + op-1 with my own Unity visuals based on [Chromatone](https://chromatone.center) system.\n\n### 2021\nFirst played live at April 20th **2021**.\n\n### Into 2022\nIt's an ongoing live album to be recorded throughout the **2022**."
 * },
 *  "timestamp": 1642590655747,
 *  "lastUpdated": "1d"
 * }
 */

/**
 * Download the post as a zip file with MD contents and icon and cover pictures if present
 * @param {Post} post
 * @example
 * import { downloadPost, usePost } from '@gun-vue/composables'
 *
 * const post = usePost( postTag, postHash )
 *
 * downloadPost(post)
 */

export async function downloadPost(post) {
  post = ref(post);
  let postData = {
    ...post.value.data,
  };

  let { title } = postData;

  const { zipPost, addFile, downloadZip } = useZip();

  let singleFile = false;

  if (title && !postData.base64) {
    await zipPost(postData);
  } else {
    title = "file";
    singleFile = true;
    const hash = await hashText(postData.base64);
    await addFile({
      title: safeHash(hash),
      file: postData.base64,
    });
  }

  await downloadZip({ title });
  return true;
}

export async function loadFromHash(category, hash) {
  if (
    category &&
    hash &&
    typeof hash == "string" &&
    hash.length == 44 &&
    hash.slice(0, 5) != "data:"
  ) {
    return await gun.get(`#${category}`).get(hash).then();
  }
  return hash;
}

async function saveToHash(category, file) {
  if (category && file && file.slice(0, 5) == "data:") {
    const hash = await hashText(file);
    gun.get(`#${category}`).get(`${hash}`).put(file);
    return hash;
  } else {
    return file;
  }
}

/**
 * Parse a post string from db
 * @param {String} data Stringified data from the hashed post
 * @returns {Object} Post object
 */

export async function parsePost(data) {
  let post;
  try {
    post = JSON.parse(data);
  } catch (e) {
    post = { base64: data };
  }
  return post;
}

/**
 * Add a new post to a tag
 * @param {String} tag
 * @param {Object} post
 * @example
 * import { addPost } from '@gun-vue/composables'
 *
 * addPost('MyTag', {
 *  title: 'New post'
 * })
 */

export async function addPost(tag, post) {
  const { icon, cover, content } = post;
  post.icon = await saveToHash("icons", post.icon);
  post.cover = await saveToHash("covers", post.cover);
  // post.content = await saveHashed("texts", post.content);
  const { text, hash } = await hashObj(post);
  gun.get(`#${tag}`).get(`${hash}`).put(text);
}

/**
 * Update a timestamp of an immutable object by resetting it back on itself. Essentially you get the object and put it back again.
 * @param {String} tag
 * @param {String} hash
 */

export async function refreshPost(tag, hash) {
  let data = await gun.get(`#${tag}`).get(hash).then();
  gun.get(`#${tag}`).get(hash).put(data);
}
