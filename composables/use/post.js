import { gun, SEA } from "./gun";
import { hashObj, hashText } from "./hash";
import { downloadText } from "./file";
import { logEvent } from "./log";
import { uploadText } from "./file";

import slugify from "slugify";
import Fuse from "fuse.js";
import ms from "ms";
import yaml from "yaml";

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
