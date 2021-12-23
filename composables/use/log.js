/**
 * Reactive version of `gun-util` Date tree
 * @module DataTree
 */

import { DateTree } from "gun-util";
import ms from "ms";
import { gun } from "./gun";

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
  name = "tree",
  from = "2021-01-01",
  until = "2023-01-01",
} = {}) {
  const treeRoot = gun.get(name);
  const tree = new DateTree(treeRoot, "minute");
  const dateTree = reactive({});
  const sorted = ref([]);
  const count = ref(0);

  let query;

  onMounted(() => {
    var newWorker = function (funcObj) {
      // Build a worker from an anonymous function body
      var blobURL = URL.createObjectURL(
          new Blob(["onmessage=", funcObj.toString()], {
            type: "application/javascript",
          })
        ),
        worker = new Worker(blobURL);

      // Won't be needing this anymore
      URL.revokeObjectURL(blobURL);

      return worker;
    };

    var w = newWorker(sortByDate);

    query = tree.on(
      function (d, date) {
        if (!d?.event) return;
        dateTree[date] = d;
      },
      { gte: from, lt: until }
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
