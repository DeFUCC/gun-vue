/**
 * Immutable hashed list of data
 * @module HashList
 */

import { gun, SEA } from "./gun";
import { hashObj } from "./hash";

export function usePublicHashList(tag = "hashed") {
  const list = reactive({});

  gun
    .get(`#${tag}`)
    .map()
    .on(function (d, k) {
      list[k] = JSON.parse(d);
    });

  async function addToList(obj) {
    const { text, hash } = await hashObj(obj);
    gun.get(`#${tag}`).get(`${hash}`).put(text);
  }

  return { list, addToList };
}
