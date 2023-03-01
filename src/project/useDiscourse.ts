/**
 * @module Discourse
 * @group Projects
 */

import { genUUID, user } from '../composables'
import { reactive, ref, computed } from 'vue'

const thePath = 'discourse'

export interface ItemType {
  type: string
  title: string
  lists: string[]
}

export const itemTypes: ItemType[] = [
  { type: 'design', title: 'Design', lists: ['project'] },
  { type: 'project', title: 'Project', lists: ['object', 'event'] },
  { type: 'event', title: 'Event', lists: ['plan'] },
  { type: 'object', title: 'Object', lists: ['plan'] },
  { type: 'plan', title: 'Plan', lists: ['tesk', 'purchase'] },
]

export interface Item {
  id: string
  author: string
  type: string
  title?: string
  description?: string
  created: number
  updated?: number
  begin?: number
  end?: number
  address?: string
  lists?: Item[]
}

export function useDiscourseItems(type: string) {

}

export function useNewDiscourseItem(id: string) {

  const newItem: Item = reactive({
    id: genUUID(6),
    author: computed(() => user.pub),
    type: 'project',
    created: Date.now()
  })

  function add() {
    console.log(newItem)
  }

  return { newItem, add }
}

