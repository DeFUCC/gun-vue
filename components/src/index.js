import "virtual:windi.css";
import "./styles/index.css";
import "./styles/transitions.css";

// ACCOUNT

export { default as AccountProfile } from "./account/Profile.vue";
export { default as AccountAvatar } from "./account/Avatar.vue";
export { default as AccountBadge } from "./account/Badge.vue";
export { default as AccountHome } from "./account/Home.vue";
export { default as AccountStars } from "./account/Stars.vue";
export { default as AccountReactions } from "./account/Reactions.vue";

// LINKs

export { default as AccountMateButton } from "./account/mate/Button.vue";
export { default as AccountMateList } from "./account/mate/List.vue";
export { default as AccountMateLink } from "./account/mate/Link.vue";

// USER

export { default as UserAuth } from "./user/Auth.vue";
export { default as UserAvatar } from "./user/Avatar.vue";
export { default as UserCreate } from "./user/Create.vue";
export { default as UserCredentials } from "./user/Credentials.vue";
export { default as UserGraph } from "./user/Graph.vue";
export { default as UserHome } from "./user/Home.vue";
export { default as UserIcon } from "./user/Icon.vue";
export { default as UserList } from "./user/List.vue";
export { default as UserLogin } from "./user/Login.vue";
export { default as UserPanel } from "./user/Panel.vue";
export { default as UserPass } from "./user/Pass.vue";
export { default as UserProfile } from "./user/Profile.vue";
export { default as UserRooms } from "./user/Rooms.vue";
export { default as UserProfileField } from "./user/profile/Field.vue";

// ROOM

export { default as RoomProfile } from "./room/Profile.vue";
export { default as RoomIcon } from './room/Icon.vue'
export { default as RoomCard } from './room/Card.vue'
export { default as RoomForm } from './room/Form.vue'
export { default as RoomPage } from './room/Page.vue'
export { default as RoomFeatures } from './room/Features.vue'

//SPACE

export { default as SpacePlane } from "./space/Plane.vue";
export { default as SpaceGuest } from "./space/Guest.vue";
export { default as SpaceArrow } from "./space/Arrow.vue";

// POSTS

export { default as PostCard } from "./post/Card.vue";
export { default as PostForm } from "./post/Form.vue";
export { default as PostGraph } from "./post/Graph.vue";
export { default as PostLine } from "./post/Line.vue";
export { default as PostList } from "./post/List.vue";
export { default as PostPage } from "./post/Page.vue";


export { default as PostActionStar } from "./post/action/Star.vue";
export { default as PostActionUpdate } from "./post/action/Update.vue";
export { default as PostActionBan } from "./post/action/Ban.vue";

export { default as PostActionReact } from "./post/action/React.vue";
export { default as ReactionButton } from "./reaction/Button.vue";
export { default as ReactionTabs } from "./reaction/Tabs.vue";

//CHAT


export { default as ChatInput } from "./chat/Input.vue";
export { default as ChatMessage } from "./chat/Message.vue";
export { default as ChatRoom } from "./chat/Room.vue";
export { default as ChatTopics } from "./chat/Topics.vue";

// PRIVATE CHAT

export { default as ChatPrivate } from "./chat/private/Index.vue";
export { default as ChatPrivateCount } from "./chat/private/Count.vue";
export { default as ChatPrivateList } from "./chat/private/List.vue";


// DICTIONARY

export { default as DictDefCard } from './dict/def/Card.vue'
export { default as DictDefList } from './dict/def/List.vue'
export { default as DictDefPage } from './dict/def/Page.vue'
export { default as DictWordCard } from './dict/word/Card.vue'
export { default as DictWordList } from './dict/word/List.vue'
export { default as DictWordPage } from './dict/word/Page.vue'
export { default as DictLinkList } from './dict/link/List.vue'
export { default as DictLinkButton } from './dict/link/Button.vue'
export { default as DictBy } from './dict/By.vue'
export { default as DictPanel } from './dict/Panel.vue'
export { default as DictAuthors } from './dict/Authors.vue'


// FORMS

export { default as FormLink } from "./form/Link.vue";
export { default as FormPicture } from "./form/Picture.vue";
export { default as FormText } from "./form/Text.vue";
export { default as FormYoutube } from "./form/Youtube.vue";
export { default as FormTitle } from "./form/Title.vue";

// UTILS

export { default as LogTree } from "./log/Tree.vue";

export { default as QrShow } from "./qr/Show.vue";
export { default as QrLoad } from "./qr/Load.vue";

export { default as EmbedYoutube } from "./embed/Youtube.vue";

export { default as UiModal } from "./ui/Modal.vue";
export { default as UiLayer } from "./ui/Layer.vue";

export { default as UtilPulse } from "./util/Pulse.vue";
export { default as UtilGraph } from "./util/Graph.vue";
export { default as UtilShare } from "./util/Share.vue";
export { default as Utiltools } from "./util/Tools.vue";
export { default as UtilRelay } from "./util/Relay.vue";

// GIFTS

export { default as GiftCard } from './gift/Card.vue'

export * from "@composables";

export { default as FloatingVue } from 'floating-vue'