/**
 * @module Projects
 */

import { computed, reactive, ref } from "vue"
import { useGun } from "../gun"
import { currentRoom } from "../room"



export function useProjects() {

  const gun = useGun()

  const projects = reactive({})

  const db = gun.user(currentRoom.pub).get('projects')

  db.map().on((d, k) => {
    console.log(k, d)
    projects[k] = d
  })

  return { projects }
}

