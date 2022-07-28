import { ref, reactive, computed, Fuse } from "./vendor.es.js";
import { useGun, currentRoom, projectsPath, newProject } from "./useDraw.es.js";
function useProjects() {
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
  gun.user(currentRoom.pub).get(projectsPath).map().on((d, k) => {
    if (d == null) {
      delete projects[k];
      return;
    }
    const data = { ...d };
    delete data._;
    projects[k] = data;
  });
  return { search, projects, candidates };
}
function countProjects() {
  const list = reactive({});
  const gun = useGun();
  gun.user(currentRoom.pub).get(projectsPath).map().on((d, k) => {
    if (d == null) {
      delete list[k];
      return;
    }
    list[k] = true;
  });
  return computed(() => Object.keys(list).length);
}
export { countProjects, useProjects };
