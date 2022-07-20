import { reactive } from 'vue'
import { useGun } from '../gun'
import { currentRoom } from '../room'
import { useUser } from '../user'



export function useNewProject() {
  const project = reactive({
    title: ''
  })

  async function addProject() {
    const gun = useGun()
    const { user } = useUser()

    gun
      .user(currentRoom.pub)
      .get('projects')
      .get(project.title + '@' + user.pub)
      .put(
        project,
        null,
        {
          opt:
            { cert: currentRoom.features?.projects }
        }
      )
  }

  return { project, addProject }
} 