/**
 * Reactive version of `gun-util` Date tree
 * @module DataTree
 */

import { DateTree } from "gun-util";
import { gun } from "./gun";

export function useDataTree(
  treeRoot = gun.get("tree"),
  from = "2021-01-01",
  until = "2023-01-01"
) {
  const tree = new DateTree(treeRoot, "hour");

  const dateTree = reactive({});

  tree.on(
    (data, date) => {
      dateTree[date] = { ...data };
    },
    { gte: from, lt: until }
  );

  function putNow(data) {
    if (!data) return;
    tree.get(new Date()).put({ event: "put", data });
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
