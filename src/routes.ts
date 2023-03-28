//@ts-expect-error
const modules = import.meta.glob('./**/routes.ts', { eager: true })

//@ts-expect-error
const routes = Object.values(modules).map(r => r?.default[0])

export default [
  {
    path: '/',
    component: () => import('./index.vue')
  },
  ...routes
]