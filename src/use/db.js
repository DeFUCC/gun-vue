const config = {
  appPath: 'this',
  dbVersion: 25,
  peers: ['https://etogun.glitch.me/gun'/*, 'http://localhost:4200/gun'*/],
}


import Gun from 'gun/gun'
import SEA from 'gun/sea.js'
import 'gun/lib/radix'
import 'gun/lib/radisk'
import 'gun/lib/store'
import 'gun/lib/rindexed'
// import 'gun/lib/webrtc'
import 'gun/nts'

checkDbVersion(localStorage.dbVersion, config.dbVersion)


export const gun = Gun({peers: config.peers, localStorage:false})
window.gun = gun //for debugging
window.sea = SEA //for debugging
export const appPath = config.appPath
export const db = gun.get(appPath)
export const soul = Gun.node.soul
export const sea = SEA


function checkDbVersion(local, current) {
  if (!local) {
    localStorage.dbVersion = current
    console.log('DB version is now ' + local)
  } else if (local < current) {
    console.error(
      `New DB version ${current} detected. Clearing local database.`,
    )
    localStorage.clear()
    localStorage.dbVersion = current
  } else {
    console.info('DB version: ' + local)
  }
}