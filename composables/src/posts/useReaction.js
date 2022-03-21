/**
 * React to posts with emojis
 * @module Reaction
 */


import { useUser, currentRoom, getFirstEmoji, useGun } from '..';
import { ref, watchEffect } from 'vue'

const rootsTags = ['posts', 'rooms']


export function useReaction({ tag, hash, back } = {}) {

  const { user } = useUser();

  const reaction = ref('👍')

  const gun = useGun()

  const roomDb = gun.user(currentRoom.pub)

  watchEffect(() => {
    if (rootsTags.includes(tag)) {
      roomDb.get(tag).get(`${hash}@${user.pub}`).on(d => {
        if (d && d !== true) {
          reaction.value = d
        }
      })
    } else {
      roomDb.get('links').get(`${tag}:${hash}@${user.pub}`).on(d => {
        if (d && d !== true) {
          reaction.value = d
        }
      })
    }
  })


  function react(r) {
    reactToPost({ tag, hash, back, reaction: getFirstEmoji(r ? r : reaction.value) })
  }
  return { reaction, react }
}


export async function reactToPost({ tag, hash, back, reaction = true } = {}) {
  const { user } = useUser();
  const gun = useGun();

  if (tag == "posts" || tag == "rooms") {
    let myPost = gun.user(currentRoom.pub).get(tag).get(`${hash}@${user.pub}`);
    let current = await myPost.then();
    myPost.put(!current ? reaction : null, null, {
      opt: { cert: currentRoom.features?.[tag] },
    });
  } else {
    let myLink = gun.user(currentRoom.pub).get("links");
    if (!back) {
      myLink = myLink.get(`${tag}:${hash}@${user.pub}`);
    } else {
      myLink = myLink.get(`${hash}:${tag}@${user.pub}`);
    }

    let current = await myLink.then();
    myLink.put(!current ? reaction : null, null, {
      opt: { cert: currentRoom.features?.links },
    });
  }
}
