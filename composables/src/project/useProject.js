import { reactive, ref, computed, onBeforeUnmount } from 'vue'
import { gun, useGun2, useGun, genUUID } from '../gun'
import { currentRoom } from '../room'
import { useUser } from '../user'
import { projectsPath } from '.'
import { SEA } from 'gun'
import { hashText, isHash } from '../crypto'


export const newProject = reactive({
  title: '',
  public: true,
  funding: false,
  room: currentRoom.pub,
  author: ''
})

export async function addProject({ publish = true } = {}) {
  const gun = useGun()
  const { user } = useUser()
  const id = genUUID()
  const link = gun.user().get(projectsPath).get(id).put(newProject, () => {
    if (!publish) return

    gun
      .user(currentRoom.pub)
      .get(projectsPath)
      .get(id + '@' + user.pub)
      .put(
        link,
        null,
        {
          opt:
            { cert: currentRoom.features?.projects }
        }
      )
    newProject.title = null
  })

}

export function updateProjectField(title, field, value) {
  const proj = gun.user().get(projectsPath).get(title)
  proj.get(field).put(value, () => {
    proj.get('updatedAt').put(Date.now())
  })
}

export function useProject(path) {
  const gun = useGun()

  const project = reactive({})

  gun.user(currentRoom.pub).get(projectsPath).get(path).map().on(async (d, k) => {
    if (k == 'cover' && isHash(d)) {
      project[k] = await gun.get('#cover').get(d).then()
    } else {
      project[k] = d
    }
  })


  function updateField(field, value) {
    updateProjectField(path.slice(0, -88), field, value)
  }

  async function updateCover(image) {
    console.log(image)
    const hash = await hashText(image)
    gun.get('#cover').get(hash).put(image)
    updateField('cover', hash)
  }

  return { project, updateField, updateCover }
}

export function useComputedProject(path = ref()) {
  const gun = useGun()

  const project = computed(() => {
    const proj = reactive({})
    gun.user(currentRoom.pub).get(projectsPath).get(path.value).map().on(async (d, k) => {
      if (k == 'cover' && isHash(d)) {
        proj[k] = await gun.get('#cover').get(d).then()
      } else {
        proj[k] = d
      }
    })
    return proj
  })

  function updateField(field, value) {
    updateProjectField(path.value.slice(0, -88), field, value)
  }

  async function updateCover(image) {
    console.log(image)
    const hash = await hashText(image)
    gun.get('#cover').get(hash).put(image)
    updateField('cover', hash)
  }

  return { project, updateField, updateCover }
}



export async function removeProject(path) {
  const gun = useGun()
  const gun2 = useGun2()
  const { user } = useUser()

  if (path.includes(user.pub)) {
    gun.user(currentRoom.pub).get(projectsPath).get(path).put(null, null, {
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

