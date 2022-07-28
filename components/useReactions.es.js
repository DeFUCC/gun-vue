import { useUser, useGun, currentRoom } from "./useDraw.es.js";
import { ref, watchEffect, reactive } from "./vendor.es.js";
import { getFirstEmoji } from "./useMates.es.js";
const rootsTags = ["rooms"];
function useReaction({ tag, hash, back } = {}) {
  const { user } = useUser();
  const reaction = ref("\u{1F44D}");
  const gun = useGun();
  const roomDb = gun.user(currentRoom.pub);
  watchEffect(() => {
    if (rootsTags.includes(tag)) {
      roomDb.get(tag).get(`${hash}@${user.pub}`).on((d) => {
        if (d && d !== true) {
          reaction.value = d;
        }
      });
    } else {
      roomDb.get("posts").get(`${tag}:${hash}@${user.pub}`).on((d) => {
        if (d && d !== true) {
          reaction.value = d;
        }
      });
    }
  });
  function react(r) {
    reactToPost({ tag, hash, back, reaction: getFirstEmoji(r ? r : reaction.value) });
  }
  return { reaction, react };
}
async function reactToPost({ tag, hash, back, reaction = true } = {}) {
  var _a, _b;
  const { user } = useUser();
  const gun = useGun();
  console.log(tag, hash, reaction);
  if (tag == "rooms") {
    let myPost = gun.user(currentRoom.pub).get(tag).get(`${hash}@${user.pub}`);
    let current = await myPost.then();
    myPost.put(!current ? reaction : null, null, {
      opt: { cert: (_a = currentRoom.features) == null ? void 0 : _a[tag] }
    });
  } else {
    let myLink = gun.user(currentRoom.pub).get("posts");
    if (!back) {
      myLink = myLink.get(`${tag}:${hash}@${user.pub}`);
    } else {
      myLink = myLink.get(`${hash}:${tag}@${user.pub}`);
    }
    let current = await myLink.then();
    myLink.put(!current ? reaction : null, null, {
      opt: { cert: (_b = currentRoom.features) == null ? void 0 : _b.posts }
    });
  }
}
function useReactions(authors) {
  const reactions = {};
  for (let pub in authors) {
    let reaction = authors[pub];
    if (reaction) {
      reactions[reaction] = reactions[reaction] || [];
      reactions[reaction].push(pub);
    }
  }
  return reactions;
}
function countRating(authors) {
  let count = 0;
  for (let author in authors) {
    if (authors[author] && authors[author] != "\u{1F5D1}") {
      count++;
    } else if (authors[author] == "\u{1F5D1}") {
      count--;
    }
  }
  return count;
}
function useUserPosts(pub) {
  const gun = useGun();
  const posts = reactive({});
  gun.user(currentRoom.pub).get("posts").map().on((d, k) => {
    var _a;
    let author = k.slice(90);
    let from = k.substring(0, 44);
    let to = k.substring(45, 89);
    if (author == pub) {
      if (d) {
        posts[d] = posts[d] || {};
        posts[d][to] = from;
      } else {
        (_a = posts == null ? void 0 : posts[d]) == null ? true : delete _a[to];
      }
    }
  });
  return posts;
}
export { countRating, reactToPost, useReaction, useReactions, useUserPosts };
