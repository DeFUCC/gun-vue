/**
 * Get and handle a particular post by it's tag and hash
 * @module Post
 */

import { computed, reactive, ref } from "vue";
import ms from "ms";

import { useGun, gun, useRoom, currentRoom, useUser } from "..";
import { useZip } from "../file/";
import { hashObj, hashText, safeHash } from "../crypto";

/**
 * An interface to manage a post
 * @param {Object} options
 * @returns {Post}
 * @example
 * const post = usePost({ tag: 'tag', hash: postHash })
 */

export function usePost({ hash = "", loadMedia = true } = {}) {
  const gun = useGun();

  const post = reactive({});

  gun
    .get('posts')
    .get(`#index`)
    .get(hash)
    .on(async (d, k) => {
      try {
        Object.assign(post, JSON.parse(d));
      } catch (e) {
        post.raw = d;
      }
      if (loadMedia) {
        ["icon", "cover", "text"].forEach((file) => {
          if (post[file]) {
            gun
              .get('posts')
              .get(`#${file}`)
              .get(post[file])
              .on((data) => {
                post[file] = data;
              });
          }
        });
      }

    });

  const downloading = ref(false);

  async function download() {
    downloading.value = true;
    await downloadPost(post);
    downloading.value = false;
  }
  return { post, download, downloading };
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
 *    "statement": "New live album by tsoop",
 *    "youtube": "K2MwpOd8vEI",
 *    "content": "It's mostly op-z + op-1 with my own Unity visuals based on [Chromatone](https://chromatone.center) system.\n\n### 2021\nFirst played live at April 20th **2021**.\n\n### Into 2022\nIt's an ongoing live album to be recorded throughout the **2022**."
 * },
 *  "timestamp": 1642590655747,
 *  "lastUpdated": "1d"
 * }
 */

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

export async function addPost(to, post) {
  const { user } = useUser();
  const { icon, cover, text } = post;
  post.icon = await saveToHash("icon", post.icon);
  post.cover = await saveToHash("cover", post.cover);
  post.text = await saveToHash("text", post.text);
  const { hashed, hash } = await hashObj(post);
  console.log(hash, post, to)
  gun.get('posts').get(`#index`).get(`${hash}`).put(hashed);
  gun
    .user(currentRoom.pub)
    .get("posts")
    .get(`${to}:${hash}@${user.pub}`)
    .put(true, null, { opt: { cert: currentRoom.features?.posts } });

}

/**
 * Download the post as a zip file with MD contents and icon and cover pictures if present
 * @param {Post} post
 * @example
 * import { downloadPost, usePost } from '@gun-vue/composables'
 *
 * const {post} = usePost( postTag, postHash )
 *
 * downloadPost(post)
 */

export async function downloadPost(post) {
  let { title } = post;

  const { zipPost, addFile, downloadZip } = useZip();

  let singleFile = false;

  if (title && !post.raw) {
    await zipPost({ ...post });
  } else {
    title = "file";
    singleFile = true;
    const hash = await hashText(post.raw);
    await addFile({
      title: safeHash(hash),
      file: post.raw,
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
    return await gun.get('posts').get(`#${category}`).get(hash).then();
  }
  return hash;
}

async function saveToHash(category, text) {
  if (category && text) {
    const hash = await hashText(text);
    gun.get('posts').get(`#${category}`).get(`${hash}`).put(text);
    return hash;
  } else {
    return text;
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
 * Get and update the timestamp of an immutable post
 * @param {} - {tag, hash} 
 * @returns {} - {timestamp, msTime, refresh}
 */

export function usePostTimestamp({ tag, hash } = {}) {
  const timestamp = ref(0)

  const msTime = computed(() => ms(Date.now() - timestamp.value || 1000))

  gun
    .get('posts')
    .get(`#index`)
    .get(hash)
    .on(function (d, k, g) {
      timestamp.value = g.put['>']
    })

  async function refresh() {
    let data = await gun.get('posts').get(`#index`).get(hash).then();
    gun.get('posts').get(`#index`).get(hash).put(data);
  }
  return { timestamp, msTime, refresh }
}