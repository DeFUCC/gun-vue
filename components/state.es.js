import { isRef, unref } from "./vendor.es.js";
const isObject = (val) => val !== null && typeof val === "object";
function toRawDeep(val, seen = /* @__PURE__ */ new Set()) {
  const unwrappedValue = isRef(val) ? unref(val) : val;
  const valueType = typeof unwrappedValue;
  if (valueType === "symbol" || valueType === "function") {
    return unwrappedValue.toString();
  }
  if (!isObject(unwrappedValue)) {
    return unwrappedValue;
  }
  if (seen.has(unwrappedValue)) {
    return Array.isArray(unwrappedValue) ? [] : {};
  }
  seen.add(unwrappedValue);
  if (Array.isArray(unwrappedValue)) {
    return unwrappedValue.map((value) => toRawDeep(value, seen));
  }
  return toRawObject(unwrappedValue, seen);
}
const toRawObject = (obj, seen = /* @__PURE__ */ new Set()) => Object.keys(obj).reduce((raw, key) => {
  raw[key] = toRawDeep(obj[key], seen);
  return raw;
}, {});
export { toRawDeep };
