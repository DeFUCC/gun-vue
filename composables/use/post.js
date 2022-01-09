import { gun } from "./gun";

import { downloadText, createMd } from "./file";

import ms from "ms";

export function useTagPost(tag = ref(""), hash = ref("")) {
  tag = ref(tag);
  hash = ref(hash);
  const post = computed(() => {
    const obj = reactive({
      empty: true,
      tag,
      hash,
      data: {},
      download,
    });

    gun
      .get(`#${tag.value}`)
      .on((d, k) => {
        obj.timestamp = d._[">"][hash.value];
        if (obj.timestamp) {
          obj.lastUpdated = ms(Date.now() - obj.timestamp);
        }
      })
      .get(hash.value)
      .on(async (d, k) => {
        let banned = await gun.get("#ban").get(k).then();
        if (tag.value != "ban" && banned) return;
        try {
          Object.assign(obj.data, JSON.parse(d));
        } catch (e) {
          obj.data.string = d;
        }
        obj.empty = false;
      });
    return obj;
  });

  async function download() {
    let frontmatter = {
      ...post.value.data,
    };
    delete frontmatter.content;
    downloadText(
      createMd({
        frontmatter,
        content: post.value.data?.content,
      }),
      "text/markdown",
      (post.value.data?.title || "post") + ".md"
    );
  }
  return post;
}
