console.log('Worker initiated')

import Gun from "gun/gun";
// import { default as SEA } from "gun/sea.js";

onmessage = m => {
  console.log('In worker:', m.data)
  const gun = Gun()
  gun.get('check').get('time').once(d => console.log(d))
  gun.get('check').get('time').put(Date.now())
  postMessage(`Answer: ${m.data}`)
}

