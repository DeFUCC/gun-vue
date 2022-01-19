/**
 * Worker wrapper for heavy functions
 * @module useWorker
 */

/**
 * Example sorter function for a dated list object
 * @param {Object} e - the worker post event with a `data` object with a list of records to sort by the date keys
 */
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

// https://vitejs.dev/guide/features.html#web-workers

/**
 * Create a new worker for a function
 * It should contain a `postMessage` method to reply to any incoming `postMessage` from the main script
 * @param {Function} funcObj
 */

export const newWorker = function (funcObj) {
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

export const sortDate = newWorker(sortByDate);
