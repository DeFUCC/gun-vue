/**
 * [[include:./project/README.md]]
 * @module useProject
 * @group Projects
 */

import { reactive, ref, computed } from "vue";
import { useGunSecondary, useGun, genUUID } from "../gun/composables";
import { currentRoom } from "../room/composables";
import { useUser, user } from "../user/composables";
import { hashText, isHash } from "../crypto/composables";

/**
 * @typedef {'design' | 'project' | 'event' | 'object' | 'opportunity' | 'task' | 'purchase'} ProjectType
 */

/**
 * @typedef {Object} ProjectItem
 * @property {string} id
 * @property {ProjectType} [type]
 * @property {string} [title]
 * @property {string} [description]
 * @property {string[]} [tags]
 * @property {string} [content]
 * @property {string} [author]
 * @property {string} [room]
 * @property {string[]} [makers]
 * @property {string} [source]
 * @property {string[]} [targets]
 * @property {string} [updatedAt]
 * @property {string} [createdAt]
 * @property {string} [startAt]
 * @property {string} [finishAt]
 * @property {[number, number]} [location]
 * @property {string} [address]
 * @property {boolean} [public]
 * @property {boolean} [funding]
 * @property {string} [color]
 * @property {Object.<string, string>} [media]
 */

/**
 * @param {string} [title]
 * @returns {{newProject: ProjectItem, addProject: (cb?: Function) => Promise<void>}}
 */
export function useNewProject(title) {
	const { user } = useUser();

	const newProject = reactive({
		id: genUUID(6),
		title,
		type: "project",
		status: "new",
		public: true,
		funding: false,
		room: computed(() => currentRoom.pub),
		author: computed(() => user.pub),
	});

	/**
	 * @param {Function} [cb]
	 */
	async function addProject(cb) {
		const gun = useGun();

		const link = gun
			.user()
			.get("projects")
			.get(newProject.id)
			.put(newProject, () => {
				if (!newProject.public) return;

				gun
					.user(currentRoom.pub)
					.get("projects")
					.get(newProject.id + "@" + user.pub)
					.put(
						link,
						() => {
							console.log("added project");
							if (cb) {
								cb();
							}
						},
						{
							opt: { cert: currentRoom.features?.projects },
						}
					);
				newProject.title = "";
				newProject.id = "";
			});
	}
	return { newProject, addProject };
}

/**
 * @param {string} title
 * @param {string} field
 * @param {string} value
 */
export function updateProjectField(title, field, value) {
	const gun = useGun();
	const proj = gun.user().get("projects").get(title);
	proj.get(field).put(value, () => {
		proj.get("updated").put(Date.now());
	});
}

/**
 * @param {string} path
 * @returns {{project: ProjectItem, updateField: (field: string, value: string) => void, updateCover: (image: string) => Promise<void>}}
 */
export function useProject(path) {
	const gun = useGun();

	const project = reactive({
		id: "0",
		type: "event",
	});

	gun
		.user(currentRoom.pub)
		.get("projects")
		.get(path)
		.map()
		.on(async (d, k) => {
			if (k == "cover" && isHash(d)) {
				project[k] = await gun.get("#cover").get(d).then();
			} else {
				project[k] = d;
			}
		});

	/**
	 * @param {string} field
	 * @param {string} value
	 */
	function updateField(field, value) {
		updateProjectField(path.slice(0, -88), field, value);
	}

	/**
	 * @param {string} image
	 */
	async function updateCover(image) {
		const hash = await hashText(image);
		if (!hash) return;
		gun.get("#cover").get(hash).put(image);
		updateField("cover", hash);
	}

	return { project, updateField, updateCover };
}

/**
 * @param {import('vue').Ref<string>} [path]
 * @returns {{project: import('vue').ComputedRef<ProjectItem>, updateField: (field: string, value: string) => void, updateCover: (image: string) => Promise<void>}}
 */
export function useComputedProject(path = ref()) {
	const gun = useGun();

	const project = computed(() => {
		const proj = reactive({
			id: "",
		});
		gun
			.user(currentRoom.pub)
			.get("projects")
			.get(path.value)
			.map()
			.on(async (d, k) => {
				if (k == "cover" && isHash(d)) {
					proj[k] = await gun.get("#cover").get(d).then();
				} else {
					proj[k] = d;
				}
			});
		return proj;
	});

	/**
	 * @param {string} field
	 * @param {string} value
	 */
	function updateField(field, value) {
		updateProjectField(path.value.slice(0, -88), field, value);
	}

	/**
	 * @param {string} image
	 */
	async function updateCover(image) {
		const hash = await hashText(image);
		if (!hash) return;
		gun.get("#cover").get(hash).put(image);
		updateField("cover", hash);
	}

	return { project, updateField, updateCover };
}

/**
 * @param {string} path
 * @returns {Promise<void>}
 */
export async function removeProject(path) {
	const gun = useGun();
	const gun2 = useGunSecondary();
	const { user } = useUser();

	if (path.includes(user.pub)) {
		gun
			.user(currentRoom.pub)
			.get("projects")
			.get(path)
			.put(null, undefined, {
				opt: { cert: currentRoom.features?.projects },
			});
	} else if (currentRoom.hosts[user.pub]) {
		const pair = await user.decrypt(currentRoom.hosts[user.pub].enc);

		gun2.user().auth(pair, () => {
			gun2.user().get("projects").get(path).put(null);
		});
	}
	console.error("Can't delete the project");
}
