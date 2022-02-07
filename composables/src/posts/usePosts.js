/**
 * Get and handle a particular post by it's tag and hash
 * @module Feed
 */

import { computed, reactive, ref } from "vue";

import JSZip from "jszip";

import { detectMimeType, useZip, parseMd } from "../file";
import { useGun, gun } from "../gun";
import { parsePost, addPost } from ".";

/**
 * @typedef useFeed
 * @property {ref} posts -  the reactive list of hashed data
 * @property {ref} timestamps - reactive timestamps list for all posts in a list
 * @property {computed} count - the number of posts in a feed
 * @property {Function} downloadPosts - Download all posts in a zip file
 * @property {Function} uploadPosts - upload a zip file with posts
 */

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
export function useFeed(tag = "posts", { host = "" } = {}) {
  const gun = useGun();

  const timestamps = ref({});

  const ban = host ? gun.user(host).get("bannedPosts") : gun.get("ban");

  const posts = reactive({});

  gun
    .get(tag)
    .on(function (d, k) {
      timestamps.value = d._[">"];
    })
    .map()
    .on(async (d, k) => {
      console.log(k, d);
      let banned = await ban.get(k).then();
      if (tag != "ban" && banned) return;
      posts[k] = d;
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
