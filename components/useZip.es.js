import { reactive, ref, computed, ms, JSZip } from "./vendor.es.js";
import { base64FileType, base64Extension, downloadFile } from "./useFile.es.js";
import { useGun, useUser, hashObj, gun, currentRoom, hashText, safeHash, genUUID } from "./useDraw.es.js";
import { createMd } from "./useMd.es.js";
function usePost({ hash = "", loadMedia = true } = {}) {
  const gun2 = useGun();
  const post = reactive({});
  gun2.get("posts").get(`#index`).get(hash).on(async (d, k) => {
    try {
      Object.assign(post, JSON.parse(d));
    } catch (e) {
      post.raw = d;
    }
    if (loadMedia) {
      ["icon", "cover", "text"].forEach((file) => {
        if (post[file]) {
          gun2.get("posts").get(`#${file}`).get(post[file]).on((data) => {
            post[file] = data;
          });
        }
      });
    }
  });
  const downloading = ref(false);
  async function download() {
    downloading.value = true;
    await downloadPost(post);
    downloading.value = false;
  }
  return { post, download, downloading };
}
async function addPost(to, post) {
  var _a;
  const { user } = useUser();
  post.icon = await saveToHash("icon", post.icon);
  post.cover = await saveToHash("cover", post.cover);
  post.text = await saveToHash("text", post.text);
  const { hashed, hash } = await hashObj(post);
  console.log(hash, post, to);
  gun.get("posts").get(`#index`).get(`${hash}`).put(hashed);
  gun.user(currentRoom.pub).get("posts").get(`${to}:${hash}@${user.pub}`).put(true, null, { opt: { cert: (_a = currentRoom.features) == null ? void 0 : _a.posts } });
}
async function downloadPost(post) {
  let { title } = post;
  const { zipPost, addFile, downloadZip } = useZip();
  if (title && !post.raw) {
    await zipPost({ ...post });
  } else {
    title = "file";
    const hash = await hashText(post.raw);
    await addFile({
      title: safeHash(hash),
      file: post.raw
    });
  }
  await downloadZip({ title });
  return true;
}
async function loadFromHash(category, hash) {
  if (category && hash && typeof hash == "string" && hash.length == 44 && hash.slice(0, 5) != "data:") {
    return await gun.get("posts").get(`#${category}`).get(hash).then();
  }
  return hash;
}
async function saveToHash(category, text) {
  if (category && text) {
    const hash = await hashText(text);
    gun.get("posts").get(`#${category}`).get(`${hash}`).put(text);
    return hash;
  } else {
    return text;
  }
}
async function parsePost(data) {
  let post;
  try {
    post = JSON.parse(data);
  } catch (e) {
    post = { base64: data };
  }
  return post;
}
function usePostTimestamp({ tag, hash } = {}) {
  const timestamp = ref(0);
  const msTime = computed(() => ms(Date.now() - timestamp.value || 1e3));
  gun.get("posts").get(`#index`).get(hash).on(function(d, k, g) {
    timestamp.value = g.put[">"];
  });
  async function refresh() {
    let data = await gun.get("posts").get(`#index`).get(hash).then();
    gun.get("posts").get(`#index`).get(hash).put(data);
  }
  return { timestamp, msTime, refresh };
}
function useZip() {
  const zip = new JSZip();
  async function addFile({ title, file, folder = "." } = {}) {
    const fileType = base64FileType(file);
    const extension = base64Extension(file);
    const blob = await fetch(file).then((res) => res.blob());
    const fileName = `${title}.${extension}`;
    zip.file(`${folder}/${fileName}`, blob, fileType);
    return fileName;
  }
  function addMd({ md, title } = {}) {
    zip.file(`${title}/index.md`, createMd(md), "text/markdown");
  }
  async function zipPost(post = {}) {
    let { icon, cover, text, title, statement } = post;
    post == null ? true : delete post.text;
    if (!title) {
      title = statement ? statement.split(0, 12) : genUUID();
    }
    const files = ["cover", "icon"];
    for (let type of files) {
      let file = await loadFromHash(type, post[type]);
      if (file) {
        const fileName = await addFile({
          title: type,
          file,
          folder: title
        });
        post[type] = fileName;
      }
    }
    text = await loadFromHash("text", text);
    addMd({
      title,
      md: {
        frontmatter: post,
        text
      }
    });
  }
  async function downloadZip({ title = "", addDate = true } = {}) {
    let now = new Date();
    const offset = now.getTimezoneOffset();
    now = new Date(now.getTime() - offset * 60 * 1e3);
    const date = now.toISOString().split("T")[0];
    const blob = await zip.generateAsync({
      type: "blob",
      comment: `Exported from ${title} at ${location} on ${date}`,
      compression: "DEFLATE",
      compressionOptions: {
        level: 9
      }
    });
    const fileName = `${title}-${date}.zip`;
    downloadFile(blob, "application/zip", fileName);
    return true;
  }
  return { zip, zipPost, addMd, addFile, downloadZip };
}
export { addPost, downloadPost, loadFromHash, parsePost, usePost, usePostTimestamp, useZip };
