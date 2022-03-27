/**
 * Reactive version of `gun-util` Date tree
 * @module useLog
 */

import { reactive, ref, onMounted, watchEffect, onBeforeUnmount } from "vue";
import { DateTree } from "gun-util";
import ms from "ms";
import { newWorker } from "./useWorker";
import { gun, useGun } from "../gun";

function sortByDate(e) {
  const arr = Object.entries(e.data);
  let sorted = arr.sort((a, b) => {
    if (!a || !b) return 0;
    let timeA = Date.parse(a[0]);
    let timeB = Date.parse(b[0]);
    return timeB - timeA;
  });
  postMessage({ sorted, count: arr.length });
}

export function useLog({
  name = "logs",
  after = "2021-01-01",
  before = "2023-01-01",
} = {}) {
  const gun = useGun();
  const treeRoot = gun.get(name);
  const tree = new DateTree(treeRoot, "minute");
  const dateTree = reactive({});
  const sorted = ref([]);
  const count = ref(0);

  let query;

  onMounted(() => {
    var w = newWorker(sortByDate);

    query = tree.on(
      function (d, date) {
        if (!d?.event) return;
        dateTree[date] = d;
      },
      { gte: after, lt: before }
    );

    watchEffect(() => {
      w.postMessage(JSON.parse(JSON.stringify(dateTree)));
    });

    w.onmessage = (e) => {
      sorted.value = e.data.sorted;
      count.value = e.data.count;
    };
  });

  onBeforeUnmount(() => {
    query.off();
  });

  function putNow(data) {
    if (!data) return;
    tree.get(new Date()).put({ event: "now", data });
  }

  return { dateTree, sorted, count, putNow };
}

export function logEvent(event = "text", data) {
  if (!data) {
    console.log("No data to log");
    return;
  }
  const tree = new DateTree(gun.get("logs"), "minute");
  let theData = { event, ...data };
  tree.get(new Date()).put(theData);
}

export function formatDate(date) {
  if (!date) return;
  let theDate = new Date(date);
  return {
    date: theDate.toLocaleDateString("en-CA"),
    time: theDate.toLocaleTimeString("ru-RU"),
    ms: ms(Date.now() - theDate.getTime()),
  };
}
