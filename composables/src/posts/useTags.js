/**
 * Get and handle a particular post by it's tag and hash
 * @module Feeds
 */

import { computed, reactive, ref } from "vue";
import slugify from "slugify";
import Fuse from "fuse.js";
import { useGun } from "../gun";
import { hashText } from "../crypto";

/**
 * @typedef useTagList
 * @property {ref} search - a ref to bind to an input element
 * @property {computed} slug - a slugified search query - url safe verion to be used as a tag
 * @property {Tags} tags - the object to handle all the tags
 * @property {Function} addTag - add a slug tag to the list
 */

/**
 * Toolkit to deal with the available tags
 * @returns {useTagList}
 */
export function useTagList() {
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
