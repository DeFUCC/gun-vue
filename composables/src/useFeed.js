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
import { downloadFile, createMd, parseMd, uploadText } from "./useFile";

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
    importFeedZip(tag.value, ev);
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

export async function addPost(tag, obj) {
  const { text, hash } = await hashObj(obj);
  gun.get(`#${tag}`).get(`${hash}`).put(text);
}

/**
 * Export the feed as a Markdown .md file
 * @param {String} tag
 * @param {Object} posts
 */

export async function exportFeed(tag, posts) {
  let checkSum = await hashText(posts);
  downloadFile(
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
 * Export a list of posts as a zip file
 * @param {String} tag - Name of the tag
 * @param {Object} posts - Posts to export
 */
import JSZip from "jszip";
export function exportFeedZip(tag, posts) {
  if (!posts) return;
  const zip = new JSZip();
  for (let hash in posts) {
    let content = posts[hash]?.content;
    delete posts[hash]?.content;
    zip.file(
      `${posts[hash]?.title || hash}.md`,
      createMd({
        content: content,
        frontmatter: posts[hash],
      }),
      "text/markdown",
      tag + ".md"
    );
  }
  zip.generateAsync({ type: "blob" }).then((content) => {
    downloadFile(content, "application/zip", `${tag}.zip`);
  });
}

export function importFeedZip(tag, files) {
  [...files].forEach((file) => {
    JSZip.loadAsync(file).then((zip) => {
      zip.forEach(async (path, entry) => {
        if (path.endsWith(".md")) {
          let title = path.slice(0, -3);
          let md = await entry.async("string");
          let { frontmatter, content } = parseMd(md);
          frontmatter.title = frontmatter?.title || title;
          let post = { ...frontmatter, content };
          addPost(tag, post);
        }
      });
    });
  });
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
