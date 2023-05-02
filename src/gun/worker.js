console.log('Worker initiated')

import { Gun, SEA } from "@gun-vue/gun-es";

onmessage = async m => {
  console.log('Worker question:', m.data)
  const gun = Gun()
  const pair = await SEA.pair()
  console.log(gun, pair)
  if (!gun?.user) {
    console.warn("Still can't enable `gun.user()` in a web worker context. Help needed! 👀")
  }
  gun.get('check').get('time').once(d => console.log(d))
  gun.get('check').get('time').put(Date.now())
  postMessage(`Worker answer: ${m.data} - OK`)
}

