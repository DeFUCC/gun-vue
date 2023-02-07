/**
 * React to posts with emojis
 * @module Reaction
 * @group Posts
 */


import { useUser, currentRoom, getFirstEmoji, useGun } from '../composables';
import { ref, watchEffect } from 'vue'
import { IGunChain, IGunUserInstance } from 'gun';

const rootsTags = ['rooms']

export interface ReactionVector {
  tag: string
  hash: string
  back?: boolean
}


export function useReaction({ tag, hash, back }: ReactionVector) {

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
      roomDb.get('posts').get(`${tag}:${hash}@${user.pub}`).on(d => {
        if (d && d !== true) {
          reaction.value = d
        }
      })
    }
  })




  function react(r: string) {
    reactToPost({ tag, hash, back, reaction: getFirstEmoji(r ? r : reaction.value) })
  }
  return { reaction, react }
}

export interface Reaction extends ReactionVector {
  reaction: string | boolean
}

export async function reactToPost({ tag, hash, back, reaction = true }: Reaction) {
  const { user } = useUser();
  const gun = useGun();
  if (tag == "rooms") {
    let myPost = gun.user(currentRoom.pub).get(tag).get(`${hash}@${user.pub}`);
    let current = await myPost.then();
    myPost.put(!current ? reaction : null, null, {
      opt: { cert: currentRoom.features?.[tag] },
    });
  } else {
    const postList = gun.user(currentRoom.pub).get("posts");
    let myLink: string
    if (!back) {
      myLink = `${tag}:${hash}@${user.pub}`
    } else {
      myLink = `${hash}:${tag}@${user.pub}`
    }
    const postLink = postList.get(myLink)
    let current = await postLink.then();
    postLink.put(!current ? reaction : null, null, {
      opt: { cert: currentRoom.features?.posts },
    });
  }
}

