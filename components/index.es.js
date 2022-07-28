import { useGun, hashText } from "./useDraw.es.js";
export { addHashedPersonal, addPersonal, addProfileField, auth, brush, createRoom, currentRoom, decFrom, defaultPeer, dictLang, dictRecord, drauu, drauuOptions, draw, encFor, enterRoom, genUUID, generateCerts, getHashedPersonal, getShortHash, gun, gun2, hasPass, hashObj, hashText, isHash, isMine, isPair, issueCert, joinRoom, leave, leaveRoom, letterFilter, listPersonal, loadCanvas, loadRelays, newProject, parseHashLink, parseLink, pass, peer, projectsPath, recreateRoom, relay, removeProject, renderStress, rootRoom, safeHash, safeJSONParse, selectedUser, soul, submitRoom, unsafeHash, updateProfile, updateProject, updateProjectField, updateRoomProfile, updateState, useAccount, useColor, useDefs, useDictAuthors, useDictLangs, useDictRecordsBy, useDictRecordsFor, useDraw, useGun, useGun2, usePass, usePassLink, useProject, useRelay, useRelays, useRoom, useRooms, useUser, useWord, useWords, user } from "./useDraw.es.js";
export { useChat } from "./useChat.es.js";
export { usePrivateChat, usePrivateChatCount, usePrivateChatList } from "./usePrivate.es.js";
export { downloadFeed, formatDate, langParts, languages, logEvent, newWorker, sortByDate, uploadFeed, useLog, usePosts } from "./useLog.es.js";
export { base64Extension, base64FileType, base64MimeType, detectMimeType, downloadFile, uploadText, usePictureUpload } from "./useFile.es.js";
export { addPost, downloadPost, loadFromHash, parsePost, usePost, usePostTimestamp, useZip } from "./useZip.es.js";
export { createMd, parseMd, useMd } from "./useMd.es.js";
export { acceptGift, giftPath, useGift, useGifts } from "./useGifts.es.js";
import { ref$1 as ref, computed$1 as computed, slugify, reactive$1 as reactive, Fuse } from "./vendor.es.js";
export { SEA, gunAvatar, mountClass, mountElement, ms, slugify } from "./vendor.es.js";
export { countRating, reactToPost, useReaction, useReactions, useUserPosts } from "./useReactions.es.js";
export { useGuests } from "./useGuests.es.js";
export { useSpace, useSvgMouse } from "./useSpace.es.js";
export { useBackground } from "./useBackground.es.js";
export { getFirstEmoji, isEmoji, useMate, useMates } from "./useMates.es.js";
export { countProjects, useProjects } from "./useProjects.es.js";
function useTagList() {
  const gun3 = useGun();
  const search = ref();
  const slug = computed(() => slugify(search.value));
  const tags = reactive({
    list: {},
    all: computed(() => {
      const arr = [];
      for (let t in tags.list) {
        arr.push({
          hash: t,
          tag: tags.list[t]
        });
      }
      return arr.sort((a, b) => a && b && a.tag.toLowerCase() < b.tag.toLowerCase() ? -1 : 1);
    }),
    count: computed(() => tags.all.length),
    fuse: computed(() => {
      return new Fuse(tags.all, {
        includeScore: true,
        keys: ["tag"]
      });
    }),
    results: computed(() => {
      if (!search.value)
        return [];
      let res = tags.fuse.search(slug.value);
      return res;
    }),
    minScore: computed(() => {
      let min = 100;
      tags.results.forEach((res) => {
        if (res.score < min) {
          min = res.score;
        }
      });
      return min;
    })
  });
  gun3.get("#tags").map().on((d, k) => {
    if (!d)
      return;
    try {
      data = JSON.parse(d);
    } catch (e) {
      tags.list[k] = d;
    }
  });
  async function addTag(tag = slug.value) {
    if (!tag)
      return;
    let safe = slugify(tag);
    const hash = await hashText(safe);
    gun3.get(`#tags`).get(`${hash}`).put(safe);
  }
  return { search, slug, tags, addTag };
}
export { useTagList };
