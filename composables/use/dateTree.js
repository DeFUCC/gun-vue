/**
 * Reactive version of `gun-util` Date tree
 * @module DataTree
 */

import { DateTree } from "gun-util";
import { gun } from "./gun";

export function useDateTree({
  name = "tree",
  from = "2021-01-01",
  until = "2023-01-01",
} = {}) {
  const treeRoot = gun.get(name);
  const tree = new DateTree(treeRoot, "minute");

  const dateTree = reactive({});

  tree.on(
    (data, date) => {
      dateTree[date] = { ...data };
    },
    { gte: from, lt: until }
  );

  function putNow(data) {
    if (!data) return;
    tree.get(new Date()).put({ event: "now", data });
  }

  return { dateTree, putNow };
}

export function formatDate(date) {
  if (!date) return;
  let theDate = new Date(date);
  return {
    date: theDate.toLocaleDateString("en-CA"),
    time: theDate.toLocaleTimeString("en-CA"),
  };
}
