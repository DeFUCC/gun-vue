/**
 * Get and handle a particular post by it's tag and hash
 * @module Feed
 */

import { computed, reactive, ref } from "vue";

import JSZip from "jszip";

import { detectMimeType, useZip, parseMd, currentRoom, useUser } from "..";
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

  const posts = reactive({});
  const backlinks = reactive({});

  if (tag == "posts") {
    gun
      .user(currentRoom.pub)
      .get("posts")
      .map()
      .on(function (data, key) {
        let hash = key.substring(0, 44);
        let author = key.substring(45);
        posts[hash] = posts[hash] || {};
        posts[hash][author] = data;
      });
  } else {
    gun
      .user(currentRoom.pub)
      .get("links")
      .map()
      .on(function (data, key) {
        let index = key.indexOf(tag);
        if (index == -1) return;
        let author = key.slice(-87);
        let from = key.slice(0, 44);
        let to = key.slice(45, 89);
        if (index == 0) {
          posts[to] = posts[to] || {};
          posts[to][author] = data;
        } else {
          backlinks[from] = backlinks[from] || {};
          backlinks[from][author] = data;
        }
      });
  }

  const countPosts = computed(() => {
    let count = 0;
    for (let hash in posts) {
      inner_loop: for (let author in posts[hash]) {
        if (posts[hash][author]) {
          count++;
          break inner_loop;
        }
      }
    }
    return count;
  });

  const countBacklinks = computed(() => {
    let count = 0;
    for (let hash in backlinks) {
      inner_loop: for (let author in backlinks[hash]) {
        if (backlinks[hash][author]) {
          count++;
          break inner_loop;
        }
      }
    }
    return count;
  });

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
    backlinks,
    countPosts,
    countBacklinks,
    downloadPosts,
    downloading,
    uploadPosts,
  };
}

export async function reactToPost({ tag, hash, back, reaction = true } = {}) {
  const { user } = useUser();
  const gun = useGun();

  if (tag == "posts" || tag == "rooms") {
    let myPost = gun.user(currentRoom.pub).get(tag).get(`${hash}@${user.pub}`);
    let current = await myPost.then();
    myPost.put(!current ? reaction : null, null, {
      opt: { cert: currentRoom.features?.[tag] },
    });
  } else {
    let myLink = gun.user(currentRoom.pub).get("links");
    if (!back) {
      myLink = myLink.get(`${tag}:${hash}@${user.pub}`);
    } else {
      myLink = myLink.get(`${hash}:${tag}@${user.pub}`);
    }

    let current = await myLink.then();
    myLink.put(!current ? reaction : null, null, {
      opt: { cert: currentRoom.features?.links },
    });
  }
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
