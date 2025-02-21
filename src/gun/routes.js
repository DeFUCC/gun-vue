export default [
  {
    path: "/settings/",
    name: "settings",
    component: () => import("./GunSettings.vue"),
  },
  {
    path: "/gun/",
    name: "gun",
    component: () => import("./GunGraph.vue"),
  }
]