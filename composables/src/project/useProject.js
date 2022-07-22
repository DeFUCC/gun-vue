import { reactive, ref, computed, onBeforeUnmount } from 'vue'
import { gun, useGun } from '../gun'
import { currentRoom } from '../room'
import { useUser } from '../user'
import { projectsPath } from '.'


export const project = reactive({
  title: '',
  public: true,
})

export async function updateProject({ publish = true } = {}) {
  const gun = useGun()
  const { user } = useUser()
  const link = gun.user().get(projectsPath).get(project.title).put(project)

  if (!publish) return

  gun
    .user(currentRoom.pub)
    .get(projectsPath)
    .get(project.title + '@' + user.pub)
    .put(
      link,
      null,
      {
        opt:
          { cert: currentRoom.features?.projects }
      }
    )
}

export function updateProjectField(title, field, value) {
  const proj = gun.user().get(projectsPath).get(title)
  proj.get(field).put(value, () => {
    proj.get('updatedAt').put(Date.now())
  })
}


export function useProject(path = ref()) {
  let req
  const gun = useGun()

  return computed(() => {
    const obj = reactive({})
    req = gun.user(currentRoom.pub).get(projectsPath).get(path.value).map().on((d, k) => {
      obj[k] = d
    })
    return obj
  })

}