import { reactive, ref, computed, onBeforeUnmount } from 'vue'
import { gun, useGun2, useGun } from '../gun'
import { currentRoom } from '../room'
import { useUser } from '../user'
import { projectsPath } from '.'
import { SEA } from 'gun'


export const newProject = reactive({
  title: '',
  public: true,
  funding: false
})

export async function updateProject({ publish = true } = {}) {
  const gun = useGun()
  const { user } = useUser()
  const link = gun.user().get(projectsPath).get(newProject.title).put(newProject, () => {
    if (!publish) return

    gun
      .user(currentRoom.pub)
      .get(projectsPath)
      .get(newProject.title + '@' + user.pub)
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


export function useProject(path = ref()) {
  path = ref(path)
  const gun = useGun()
  const project = computed(() => {
    const proj = reactive({})
    gun.user(currentRoom.pub).get(projectsPath).get(path.value).map().on((d, k) => {
      proj[k] = d
    })
    return proj
  })
  return { project }
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


}

