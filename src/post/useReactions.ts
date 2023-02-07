/**
 * Reactions to posts with emojis
 * @module Reactions
 * @group Posts
 */

import { useGun, currentRoom } from '../composables';
import { reactive } from 'vue'
import type { PostList } from './usePosts'

export interface AuthorList { [key: string]: string }


export function useReactions(authors: AuthorList) {
  const reactions = {}
  for (let pub in authors) {
    let reaction = authors[pub]
    if (reaction) {
      reactions[reaction] = reactions[reaction] || []
      reactions[reaction].push(pub)
    }

  }
  return reactions
}

export function countRating(authors: AuthorList) {
  let count = 0
  for (let author in authors) {
    if (authors[author] && authors[author] != '🗑') {
      count++
    } else if (authors[author] == '🗑') {
      count--
    }
  }
  return count
}


export function useUserPosts(pub: string): PostList {
  const gun = useGun()
  const posts = reactive({})
  gun.user(currentRoom.pub).get('posts').map().on((d, k) => {
    let author = k.slice(90);
    let from = k.substring(0, 44)
    let to = k.substring(45, 89)
    if (author == pub) {
      if (d) {
        posts[d] = posts[d] || {}
        posts[d][to] = from
      } else {
        delete posts?.[d]?.[to]
      }

    }
  })
  return posts
}