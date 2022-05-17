import "virtual:windi.css";
import "./styles/index.css";
import "./styles/transitions.css";

// ACCOUNT

export { default as AccountProfile } from "./account/AccountProfile.vue";
export { default as AccountAvatar } from "./account/AccountAvatar.vue";
export { default as AccountBadge } from "./account/AccountBadge.vue";
export { default as AccountHome } from "./account/AccountHome.vue";
export { default as AccountStars } from "./account/AccountStars.vue";
export { default as AccountReactions } from "./account/AccountReactions.vue";

// LINKs

export { default as AccountMateButton } from "./account/mate/AccountMateButton.vue";
export { default as AccountMateList } from "./account/mate/AccountMateList.vue";
export { default as AccountMateLink } from "./account/mate/AccountMateList.vue";

// USER

export { default as UserAuth } from "./user/UserAuth.vue";
export { default as UserAvatar } from "./user/UserAvatar.vue";
export { default as UserCreate } from "./user/UserCreate.vue";
export { default as UserCredentials } from "./user/UserCredentials.vue";
export { default as UserGraph } from "./user/UserGraph.vue";
export { default as UserHome } from "./user/UserHome.vue";
export { default as UserIcon } from "./user/UserIcon.vue";
export { default as UserList } from "./user/UserList.vue";
export { default as UserLogin } from "./user/UserLogin.vue";
export { default as UserPanel } from "./user/UserPanel.vue";
export { default as UserPass } from "./user/UserPass.vue";
export { default as UserProfile } from "./user/UserProfile.vue";
export { default as UserRooms } from "./user/UserRooms.vue";
export { default as UserProfileField } from "./user/profile/UserProfileField.vue";

// ROOM

export { default as RoomProfile } from "./room/RoomProfile.vue";
export { default as RoomIcon } from './room/RoomIcon.vue'
export { default as RoomCard } from './room/RoomCard.vue'
export { default as RoomForm } from './room/RoomForm.vue'
export { default as RoomPage } from './room/RoomPage.vue'
export { default as RoomFeatures } from './room/RoomFeatures.vue'

//SPACE

export { default as SpacePlane } from "./space/SpacePlane.vue";
export { default as SpaceGuest } from "./space/SpaceGuest.vue";
export { default as SpaceArrow } from "./space/SpaceArrow.vue";

// POSTS

export { default as PostCard } from "./post/PostCard.vue";
export { default as PostForm } from "./post/PostForm.vue";
export { default as PostGraph } from "./post/PostGraph.vue";
export { default as PostLine } from "./post/PostLine.vue";
export { default as PostList } from "./post/PostList.vue";
export { default as PostPage } from "./post/PostPage.vue";


export { default as PostActionStar } from "./post/action/PostActionStar.vue";
export { default as PostActionUpdate } from "./post/action/PostActionUpdate.vue";
export { default as PostActionBan } from "./post/action/PostActionBan.vue";

export { default as PostActionReact } from "./post/action/PostActionReact.vue";
export { default as ReactionButton } from "./reaction/ReactionButton.vue";
export { default as ReactionTabs } from "./reaction/ReactionTabs.vue";

//CHAT


export { default as ChatInput } from "./chat/ChatInput.vue";
export { default as ChatMessage } from "./chat/ChatMessage.vue";
export { default as ChatRoom } from "./chat/ChatRoom.vue";
export { default as ChatTopics } from "./chat/ChatTopics.vue";

// PRIVATE CHAT

export { default as ChatPrivate } from "./chat/private/ChatPrivateIndex.vue";
export { default as ChatPrivateCount } from "./chat/private/ChatPrivateCount.vue";
export { default as ChatPrivateList } from "./chat/private/ChatPrivateList.vue";


// DICTIONARY

export { default as DictDefCard } from './dict/def/DictDefCard.vue'
export { default as DictDefList } from './dict/def/DictDefList.vue'
export { default as DictDefPage } from './dict/def/DictDefPage.vue'
export { default as DictWordCard } from './dict/word/DictWordCard.vue'
export { default as DictWordList } from './dict/word/DictWordList.vue'
export { default as DictWordPage } from './dict/word/DictWordPage.vue'
export { default as DictLinkList } from './dict/link/DictLinkList.vue'
export { default as DictLinkButton } from './dict/link/DictLinkButton.vue'
export { default as DictBy } from './dict/DictBy.vue'
export { default as DictPanel } from './dict/DictPanel.vue'
export { default as DictAuthors } from './dict/DictAuthors.vue'


// FORMS

export { default as FormLink } from "./form/FormLink.vue";
export { default as FormPicture } from "./form/FormPicture.vue";
export { default as FormText } from "./form/FormText.vue";
export { default as FormYoutube } from "./form/FormYoutube.vue";
export { default as FormTitle } from "./form/FormTitle.vue";

// UTILS

export { default as LogTree } from "./log/LogTree.vue";

export { default as QrShow } from "./qr/QrShow.vue";
export { default as QrLoad } from "./qr/QrLoad.vue";

export { default as EmbedYoutube } from "./embed/EmbedYoutube.vue";

export { default as UiModal } from "./ui/UiModal.vue";
export { default as UiLayer } from "./ui/UiLayer.vue";

export { default as UtilPulse } from "./util/UtilPulse.vue";
export { default as UtilGraph } from "./util/UtilGraph.vue";
export { default as UtilShare } from "./util/UtilShare.vue";
export { default as UtilTools } from "./util/UtilTools.vue";
export { default as UtilRelay } from "./util/UtilRelay.vue";

export * from "@composables";
