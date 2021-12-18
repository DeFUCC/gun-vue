/**
 * Immutable hashed list of data
 * @module HashList
 */

import { gun, SEA } from "./gun";
import { hashObj, hashText } from "./hash";

import slugify from "slugify";
import Fuse from "fuse.js";

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
      tags.list[k] = d;
    });

  async function addTag(tag) {
    if (!tag) return;
    let safe = slugify(tag);
    const hash = await hashText(safe);
    gun.get(`#tags`).get(`${hash}`).put(safe);
  }

  return { search, slug, tags, addTag };
}

export function useTag(tag = ref("tag1")) {
  const list = computed(() => {
    const obj = reactive({});
    gun
      .get(`#${tag.value}`)
      .map()
      .on((d, k) => {
        obj[k] = JSON.parse(d);
      });
    return obj;
  });

  async function addToTag(obj) {
    const { text, hash } = await hashObj(obj);
    gun.get(`#${tag.value}`).get(`${hash}`).put(text);
  }

  return { list, addToTag };
}
