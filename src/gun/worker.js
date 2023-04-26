console.log('Worker initiated')

import { Gun, SEA } from "../../gun-es/dist/gun-es.js";

onmessage = async m => {
  console.log('In worker:', m.data)
  const gun = Gun()
  const pair = await SEA.pair()
  gun.user().auth(pair, () => {
    console.log('user authed', pair)
  })
  gun.get('check').get('time').once(d => console.log(d))
  gun.get('check').get('time').put(Date.now())
  postMessage(`Answer: ${m.data}`)
}

