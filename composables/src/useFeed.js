/**
 * Immutable hashed lists of data
 * @module useFeed
 */

import { computed, reactive, ref } from "vue";

import slugify from "slugify";
import Fuse from "fuse.js";
import JSZip from "jszip";

import { gun, useGun } from "./useGun";
import { hashObj, hashText } from "./useHash";
import { detectMimeType } from "./useFile";
import { parseMd } from "./useMd";
import { useZip } from "./useZip";

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
      return arr;
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
 * @param {ref} tag - A vue ref to watch - generated from props by `toRef(props,'tag')`
 * @param {Object} options - Options for the feed
 * @returns {useFeed}
 * @example
 * import { useFeed } from '@gun-vue/composables'
 *
 * const { posts, timestamps, count, uploadPosts, downloadPosts} = useFeed('MyTag')
 */
export function useFeed(tag = ref("tag"), { host = "" } = {}) {
  const gun = useGun();
  tag = ref(tag);
  const timestamps = ref({});

  const ban = host ? gun.user(host).get("bannedPosts") : gun.get("#ban");

  const posts = computed(() => {
    const obj = reactive({});
    gun
      .get(`#${tag.value}`)
      .on(function (d, k) {
        timestamps.value = d._[">"];
      })
      .map()
      .on(async (d, k) => {
        let banned = await ban.get(k).then();
        if (tag.value != "ban" && banned) return;
        try {
          obj[k] = JSON.parse(d);
        } catch (e) {
          obj[k] = { content: d };
        }
      });
    return obj;
  });

  const count = computed(() => Object.keys(posts.value).length);

  function downloadPosts() {
    downloadFeed(tag.value, posts.value);
  }

  function uploadPosts(ev) {
    uploadFeed(tag.value, ev);
  }

  return {
    posts,
    timestamps,
    count,
    downloadPosts,
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
 * Add a new post to a tag
 * @param {String} tag
 * @param {Object} obj
 * @example
 * import { addPost } from '@gun-vue/composables'
 *
 * addPost('MyTag', {
 *  title: 'New post'
 * })
 */

export async function addPost(tag, obj) {
  const { text, hash } = await hashObj(obj);
  gun.get(`#${tag}`).get(`${hash}`).put(text);
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
  downloadZip({ title: `#${tag}` });
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
            .file(`${title}/${frontmatter.cover}`)
            .async("base64");
          const coverMime = detectMimeType(cover);
          frontmatter.cover = `data:${coverMime};base64,${cover}`;
        }
        let post = { ...frontmatter, content };
        addPost(tag, post);
      }
    });
  });
}
