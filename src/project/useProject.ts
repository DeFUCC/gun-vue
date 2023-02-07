/**
 * @module Project
 * @group Projects
 */

import { reactive, ref, computed } from 'vue'
import { gun, useGun2, useGun, genUUID } from '../gun/composables'
import { currentRoom } from '../room/composables'
import { useUser } from '../user/composables'
import { projectsPath } from './composables'
import { SEA } from 'gun'
import { hashText, isHash } from '../crypto/composables'


export interface Item {
  id?: string
  [key: string]: string | undefined
}

export type ProjectType = 'event' | 'object'

export interface Project extends Item {
  type?: ProjectType,
}


export const newProject = reactive({
  title: '',
  public: true,
  funding: false,
  room: currentRoom.pub,
  author: ''
})

export async function addProject() {
  const gun = useGun()
  const { user } = useUser()
  const id = genUUID(6)
  newProject.author = user.pub
  const link = gun.user().get(projectsPath).get(id).put(newProject, () => {
    if (!newProject.public) return

    gun
      .user(currentRoom.pub)
      .get(projectsPath)
      .get(id + '@' + user.pub)
      .put(
        link,
        undefined,
        {
          opt:
            { cert: currentRoom.features?.projects }
        }
      )
    newProject.title = ''
  })

}

export function updateProjectField(title: string, field: string, value: string) {
  const proj = gun.user().get(projectsPath).get(title)
  proj.get(field).put(value, () => {
    proj.get('updatedAt').put(Date.now())
  })
}

export function useProject(path: string) {
  const gun = useGun()

  const project: Project = reactive({
    id: '0',
    type: 'event'
  })

  gun.user(currentRoom.pub).get(projectsPath).get(path).map().on(async (d, k) => {
    if (k == 'cover' && isHash(d)) {
      project[k] = await gun.get('#cover').get(d).then()
    } else {
      project[k] = d
    }
  })


  function updateField(field: string, value: string) {
    updateProjectField(path.slice(0, -88), field, value)
  }

  async function updateCover(image: string) {
    console.log(image)
    const hash = await hashText(image)
    if (!hash) return
    gun.get('#cover').get(hash).put(image)
    updateField('cover', hash)
  }

  return { project, updateField, updateCover }
}

export function useComputedProject(path = ref()) {
  const gun = useGun()

  const project = computed(() => {
    const proj: Project = reactive({})
    gun.user(currentRoom.pub).get(projectsPath).get(path.value).map().on(async (d, k) => {
      if (k == 'cover' && isHash(d)) {
        proj[k] = await gun.get('#cover').get(d).then()
      } else {
        proj[k] = d
      }
    })
    return proj
  })

  function updateField(field: string, value: string) {
    updateProjectField(path.value.slice(0, -88), field, value)
  }

  async function updateCover(image: string) {
    const hash = await hashText(image)
    if (!hash) return
    gun.get('#cover').get(hash).put(image)
    updateField('cover', hash)
  }

  return { project, updateField, updateCover }
}



export async function removeProject(path: string) {
  const gun = useGun()
  const gun2 = useGun2()
  const { user } = useUser()

  if (path.includes(user.pub)) {
    gun.user(currentRoom.pub).get(projectsPath).get(path).put(null, undefined, {
      opt:
        { cert: currentRoom.features?.projects }
    })

  } else if (currentRoom.hosts[user.pub]) {
    const pair = await SEA.decrypt(currentRoom.hosts[user.pub].enc, user.pair())
    gun2.user().auth(pair, () => {
      gun2.user().get(projectsPath).get(path).put(null)
    })

  }
  console.error("Can't delete the project")

}

