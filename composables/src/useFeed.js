/**
 * Immutable hashed lists of data
 * @module Feeds
 */

import { computed, reactive, ref } from "vue";

import slugify from "slugify";
import Fuse from "fuse.js";

import { logEvent } from "./useLog";
import { gun, useGun } from "./useGun";
import { hashObj, hashText } from "./useHash";
import { downloadText, createMd, parseMd, uploadText } from "./useFile";

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
 * @typedef useFeed
 * @property {reactive} list -  the reactive list of hashed data
 * @property {Function} addToTag - stringifies an object and puts it into an immutable #tag graph
 */

/**
 * Use a list of immutable data from a #tag
 * @param {ref} tag - A vue ref to watch - generated from props by `toRef(props,'tag')`
 * @returns {useFeed}
 */
export function useFeed(tag = ref("tag")) {
  const gun = useGun();
  tag = ref(tag);
  const timestamps = ref({});

  const posts = computed(() => {
    const obj = reactive({});
    gun
      .get(`#${tag.value}`)
      .on(function (d, k) {
        timestamps.value = d._[">"];
      })
      .map()
      .on(async (d, k) => {
        let banned = await gun.get("#ban").get(k).then();
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
    exportFeedZip(tag.value, posts.value);
  }

  function uploadPosts(ev) {
    importFeed(tag.value, ev);
  }

  function uploadPost(ev) {
    importPost(tag.value, ev);
  }

  function publishPost(post) {
    addPost(tag.value, post);
  }

  function banPost(post) {
    addPost("ban", post);
  }

  return {
    posts,
    timestamps,
    count,
    downloadPosts,
    uploadPosts,
    uploadPost,
    publishPost,
    banPost,
  };
}

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

export async function addPost(tag, obj, log = true) {
  const { text, hash } = await hashObj(obj);
  gun.get(`#${tag}`).get(`${hash}`).put(text);
  if (log) {
    logEvent("new-post", {
      event: "new-post",
      feed: tag,
      hash,
    });
  }
}

/**
 * Export the feed as a Markdown .md file
 * @param {String} tag
 * @param {Object} posts
 */

export async function exportFeed(tag, posts) {
  let checkSum = await hashText(posts);
  downloadText(
    createMd({
      content: "",
      frontmatter: {
        title: tag,
        type: "feed",
        postsHash: checkSum,
        posts: posts,
      },
    }),
    "text/markdown",
    tag + ".md"
  );
}

/**
 *
 * @param {*} tag
 * @param {*} posts
 */
import * as JSZip from "@zip.js/zip.js";
export async function exportFeedZip(tag, posts) {
  if (!posts) return;
  console.log(tag);
  for (let hash in posts) {
    console.log(posts[hash]);
  }
}

/**
 * Import feed from a markdown file
 * @param {String} tag
 * @param {Event} event - the event from the file input
 */

export function importFeed(tag, event) {
  uploadText(event, (file) => {
    let { frontmatter } = parseMd(file);
    for (let hash in frontmatter?.posts) {
      addPost(tag, frontmatter.posts[hash]);
    }
  });
}

export function importPost(tag, event) {
  uploadText(event, (file) => {
    let { frontmatter, content } = parseMd(file);
    let post = { ...frontmatter, content };
    addPost(tag, post);
  });
}
