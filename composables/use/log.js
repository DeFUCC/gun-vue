import { DateTree } from "gun-util";
import { gun } from "./gun";

export function logEvent(event = "text", data) {
  if (!data) {
    console.log("No data to log");
    return;
  }
  const tree = new DateTree(gun.get("log"), "minute");
  tree.get(new Date()).put({ event, data });
}
