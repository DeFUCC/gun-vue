import auth from './auth/routes'
import chat from './chat/routes'
import dict from './dict/routes'
import gifts from './gifts/routes'
import gun from './gun/routes'
import my from './my/routes'
import posts from './posts/routes'
import projects from './projects/routes'
import rooms from './rooms/routes'
import space from './space/routes'
import users from './users/routes'

export default [
  {
    path: '/',
    component: () => import('./index.vue')
  },
  ...auth,
  ...chat,
  ...dict,
  ...gifts,
  ...gun,
  ...my,
  ...posts,
  ...projects,
  ...rooms,
  ...space,
  ...users
]