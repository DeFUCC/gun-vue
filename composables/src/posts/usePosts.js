/**
 * Get and handle a particular post by it's tag and hash
 * @module Feed
 */

import { computed, reactive, ref } from "vue";

import JSZip from "jszip";

import { detectMimeType, useZip, parseMd, useRoom, listPersonal } from "..";
import { useGun, gun } from "../gun";
import { parsePost, addPost, usePost } from ".";

/**
 * @typedef usePosts
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
 * @returns {usePosts}
 * @example
 * import { usePosts } from '@gun-vue/composables'
 *
 * const { posts, timestamps, count, uploadPosts, downloadPosts} = usePosts('MyTag')
 */
export function usePosts(tag = "posts") {
  const gun = useGun();

  const { room } = useRoom();

  const posts = reactive({});

  if (tag == "posts") {
    gun
      .user(room.pub)
      .get(`${tag}`)
      .map()
      .on(function (data, key) {
        let hash = key.substring(0, 44);
        let author = key.substring(45);
        posts[hash] = posts[hash] || {};
        posts[hash][author] = data;
      });
  } else {
    gun
      .user(room.pub)
      .get("links")
      .map()
      .on(function (data, key) {
        let index = key.indexOf(tag);
        if (index == -1) return;
        let hash;
        if (index == 0) {
          hash = key.slice(45, 89);
        } else {
          hash = key.slice(0, 44);
        }
        let author = key.slice(-87);

        posts[hash] = posts[hash] || {};
        posts[hash][author] = data;
      });
  }

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
  const fullPosts = {};
  for (let hash in posts) {
    fullPosts[hash] = usePost({ tag, hash }).post;
    await zipPost({ ...fullPosts[hash] });
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
