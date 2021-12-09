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
  const tree = new DateTree(treeRoot, "day");

  const dateTree = reactive({
    recent: {},
  });

  tree.on(
    (data, date) => {
      dateTree.recent[date] = { ...data };
    },
    { gte: from, lt: until }
  );

  function putNow(data) {
    tree.get(new Date()).put({ event: "put", data });
  }
  return { dateTree, putNow };
}
