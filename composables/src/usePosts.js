/**
 * Get and handle a particular post by it's tag and hash
 * @module usePosts
 */

import { computed, reactive, ref } from "vue";
import ms from "ms";
import slugify from "slugify";
import Fuse from "fuse.js";
import JSZip from "jszip";

import { detectMimeType } from "./useFile";
import { parseMd } from "./useMd";
import { useGun, gun } from "./useGun";
import { useZip } from "./useZip";
import { hashObj, hashText, safeHash } from "./useCrypto";

/**
 * @typedef useFeeds
 * @property {ref} search - a ref to bind to an input element
 * @property {computed} slug - a slugified search query - url safe verion to be used as a tag
 * @property {Tags} tags - the object to handle all the tags
 * @property {Function} addTag - add a slug tag to the list
 */

/**
 * Toolkit to deal with the available tags
 * @returns {useFeeds}
 */
export function useFeeds() {
  const gun = useGun();

  const search = ref();
  const slug = computed(() => slugify(search.value));

  const tags = reactive({
    list: {},
    all: computed(() => {
      const arr = [];
      for (let t in tags.list) {
        arr.push({
          hash: t,
          tag: tags.list[t],
        });
      }
      return arr.sort((a, b) =>
        a && b && a.tag.toLowerCase() < b.tag.toLowerCase() ? -1 : 1
      );
    }),
    count: computed(() => tags.all.length),
    fuse: computed(() => {
      return new Fuse(tags.all, {
        includeScore: true,
        keys: ["tag"],
      });
    }),
    results: computed(() => {
      if (!search.value) return [];
      let res = tags.fuse.search(slug.value);
      return res;
    }),
    minScore: computed(() => {
      let min = 100;
      tags.results.forEach((res) => {
        if (res.score < min) {
          min = res.score;
        }
      });
      return min;
    }),
  });

  gun
    .get("#tags")
    .map()
    .on((d, k) => {
      if (!d) return;
      try {
        data = JSON.parse(d); //ignore objects
      } catch (e) {
        tags.list[k] = d; // assumes tag is a plain string
      }
    });

  async function addTag(tag = slug.value) {
    if (!tag) return;
    let safe = slugify(tag);
    const hash = await hashText(safe);
    gun.get(`#tags`).get(`${hash}`).put(safe);
  }

  return { search, slug, tags, addTag };
}

/**
 * Use a list of immutable data from a #tag
 * @param {String} tag - A vue ref to watch - generated from props by `toRef(props,'tag')`
 * @param {Object} options - Options for the feed
 * @returns {useFeed}
 * @example
 * import { useFeed } from '@gun-vue/composables'
 *
 * const { posts, timestamps, count, uploadPosts, downloadPosts} = useFeed('MyTag')
 */
export function useFeed(tag = "tag", { host = "" } = {}) {
  const gun = useGun();

  const timestamps = ref({});

  const ban = host ? gun.user(host).get("bannedPosts") : gun.get("#ban");

  const posts = reactive({});

  gun
    .get(`#${tag}`)
    .on(function (d, k) {
      timestamps.value = d._[">"];
    })
    .map()
    .on(async (d, k) => {
      let banned = await ban.get(k).then();
      if (tag != "ban" && banned) return;
      posts[k] = await parsePost(d);
    });

  const count = computed(() => Object.keys(posts || {}).length);

  const downloading = ref(false);

  async function downloadPosts() {
    downloading.value = true;
    downloading.value = !(await downloadFeed(tag, posts));
  }

  function uploadPosts(ev) {
    uploadFeed(tag, ev);
  }

  return {
    posts,
    timestamps,
    count,
    downloadPosts,
    downloading,
    uploadPosts,
  };
}

/**
 * @typedef useFeed
 * @property {ref} posts -  the reactive list of hashed data
 * @property {ref} timestamps - reactive timestamps list for all posts in a list
 * @property {computed} count - the number of posts in a feed
 * @property {Function} downloadPosts - Download all posts in a zip file
 * @property {Function} uploadPosts - upload a zip file with posts
 */

export function useBanned(hash) {
  const banned = ref(false);
  gun
    .get("#ban")
    .get(hash)
    .on((d) => {
      banned.value = d;
    });
  return banned;
}

/**
 * Export a list of posts as a zip file
 * @async
 * @param {String} tag - Name of the tag
 * @param {Object} posts - Posts to export
 * @example
 * import {downloadFeed} from '@gun-vue/components'
 *
 * downloadFeed('myTag',posts)
 */

export async function downloadFeed(tag, posts) {
  if (!posts) return;

  const { zip, zipPost, downloadZip } = useZip();

  for (let hash in posts) {
    let frontmatter = {
      ...posts[hash],
    };
    await zipPost(frontmatter);
  }
  await downloadZip({ title: `#${tag}` });
  return true;
}

/**
 * Upload zip files and add all the MD files from it to the tag
 * @param {String} tag - a tag to add the posts to
 * @param {FileList} files - File list from the input `@change` event
 * @example
 * import { uploadFeed } from '@gun-vue/composables'
 * @example @lang html
 * <input type="file" @change="uploadFeed( 'myTag', $event.target.files )" />
 */
export function uploadFeed(tag, files) {
  [...files].forEach(async (file) => {
    const zip = await JSZip.loadAsync(file);
    if (zip.comment) {
      console.info("Zip file comment: " + zip.comment);
    }
    zip.forEach(async (path, entry) => {
      if (path.endsWith("index.md")) {
        let title = path.slice(0, -9);
        let md = await entry.async("string");
        let { frontmatter, content } = parseMd(md);
        frontmatter = frontmatter || {};
        frontmatter.title = frontmatter?.title || title;
        if (frontmatter.icon) {
          const icon = await zip
            .file(`${title}/${frontmatter.icon}`)
            .async("base64");
          const iconMime = detectMimeType(icon);
          frontmatter.icon = `data:${iconMime};base64,${icon}`;
        }
        if (frontmatter.cover) {
          const cover = await zip
            ?.file(`${title}/${frontmatter.cover}`)
            ?.async("base64");
          const coverMime = detectMimeType(cover);
          frontmatter.cover = `data:${coverMime};base64,${cover}`;
        }
        let post = { ...frontmatter, content };
        addPost(tag, post);
      }
    });
  });
}

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
 *    "statement": "New live album by tsoop",
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
