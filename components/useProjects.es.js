import { ref$1 as ref, reactive$1 as reactive, computed$1 as computed, Fuse } from "./vendor.es.js";
import { newProject, useGun, projectsPath, currentRoom } from "./useDraw.es.js";
function useProjects(pub = currentRoom.pub) {
  const search = ref("");
  const projects = reactive({});
  const fuse = computed(() => {
    const list = Object.entries(projects).map((arr) => ({ ...arr[1], path: arr[0] }));
    return new Fuse(list, {
      includeScore: true,
      ignoreLocation: true,
      keys: ["title"]
    });
  });
  const candidates = computed(() => {
    if (newProject.title) {
      return fuse.value.search(newProject.title);
    } else {
      return Object.entries(projects).map((arr) => ({ item: { ...arr[1], path: arr[0] } }));
    }
  });
  const gun = useGun();
  gun.user(pub).get(projectsPath).map().on((d, k) => {
    if (d == null) {
      delete projects[k];
      return;
    }
    const data = { ...d, path: k };
    delete data._;
    projects[k] = data;
  });
  return { projects, search, candidates };
}
function countProjects(pub = currentRoom.pub) {
  const list = reactive({});
  const gun = useGun();
  gun.user(pub).get(projectsPath).map().on((d, k) => {
    if (d == null) {
      delete list[k];
      return;
    }
    list[k] = true;
  });
  return computed(() => Object.keys(list).length);
}
export { countProjects, useProjects };
