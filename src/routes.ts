import auth from './auth/routes'
import chat from './chat/routes'
import dict from './dict/routes'
import gifts from './gift/routes'
import gun from './gun/routes'
import file from './file/routes'
import my from './my/routes'
import posts from './post/routes'
import projects from './project/routes'
import rooms from './room/routes'
import space from './space/routes'
import user from './user/routes'

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
  ...user,
  ...file
]