/**
 * Get and handle a particular post by it's tag and hash
 * @module useTags
 */

import { computed, reactive, ref } from "vue";
import slugify from "slugify";
import Fuse from "fuse.js";
import { useGun } from "../gun";
import { hashText } from "../crypto";
import { currentRoom } from "../room";

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
        JSON.parse(d); //ignore objects
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



export function listPersonalTag(tag, pub = currentRoom.pub) {
  const gun = useGun();
  const records = reactive({});
  gun
    .user(pub)
    .get(`${tag}`)
    .map()
    .on(function (data, key) {
      let k = key.substring(0, 87);
      records[k] = records[k] || {};
      records[k][key.substring(88)] = data;
    });
  return records;
}

// export async function addHashedPersonal(tag, obj, pub = currentRoom.pub, cert) {
//   if (!cert) cert = await gun.get(`~${pub}`).get("features").get(tag).then();
//   if (!cert && pub == rootRoom.pub) {
//     cert = rootRoom.features?.[`#${tag}`];
//   }
//   if (!cert && pub != user.pub) {
//     console.log("No certificate found");
//     return;
//   }
//   const { hashed, hash } = await hashObj(obj);
//   gun
//     .get(`~${pub}`)
//     .get(`#${tag}`)
//     .get(`${hash}@${user.pub}`)
//     .put(hashed, null, { opt: { cert } });
// }

// export function getHashedPersonal(tag, hash, pub = currentRoom.pub) {
//   const record = reactive({});
//   gun
//     .get(`~${pub}`)
//     .get(`#${tag}`)
//     .map()
//     .once(function (data, key) {
//       if (key.includes(hash)) {
//         record.hash = hash;
//         record.tag = tag;
//         record.data = safeJSONParse(data);
//         record.authors = record.authors || {};
//         record.authors[key.slice(-87)] = true;
//       }
//     });
//   return { record };
// }
