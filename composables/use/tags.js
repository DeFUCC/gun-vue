/**
 * Immutable hashed list of data
 * @module Tags
 */

import { gun, SEA } from "./gun";
import { hashObj, hashText } from "./hash";

import slugify from "slugify";
import Fuse from "fuse.js";
import ms from "ms";

/**
 * @typedef useTags
 * @property {Ref} search - a ref to bind to an input element
 * @property {Computed} slug - a slugified search query - url safe verion to be used as a tag
 * @property {Tags} tags - the object to handle all the tags
 * @property {Function} addTag - add a slug tag to the list
 */

/**
 * Toolkit to deal with the available tags
 * @returns {useTags}
 */
export function useTags() {
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
      let data;
      try {
        data = JSON.parse(d);
      } catch (e) {
        tags.list[k] = d;
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
 * @typedef useTagPosts
 * @property {Reactive} list -  the reactive list of hashed data
 * @property {Function} addToTag - stringifies an object and puts it into an immutable #tag graph
 */

/**
 * Use a list of immutable data from a #tag
 * @param {Ref} tag - A vue ref to watch - generated from props by `toRef(props,'tag')`
 * @returns {useTagPosts}
 */
export function useTagPosts(tag = ref("tag")) {
  const posts = computed(() => {
    const obj = reactive({});
    gun
      .get(`#${tag.value}`)
      .map()
      .on(async (d, k) => {
        let banned = await gun.get("#ban").get(k).then();
        if (tag.value != "ban" && banned) return;
        try {
          obj[k] = JSON.parse(d);
        } catch (e) {
          obj[k] = d;
        }
      });
    return obj;
  });

  const count = computed(() => Object.keys(posts.value).length);

  async function addPost(obj) {
    const { text, hash } = await hashObj(obj);
    gun.get(`#${tag.value}`).get(`${hash}`).put(text);
  }

  return { posts, count, addPost };
}

export function useTagPost(tag = ref(""), hash = ref("")) {
  const post = computed(() => {
    const obj = reactive({
      empty: true,
      tag,
      hash,
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
          Object.assign(obj, JSON.parse(d));
        } catch (e) {
          obj["string"] = d;
        }
        obj.empty = false;
      });
    return obj;
  });
  return post;
}
