import "virtual:windi.css";
import "./styles/index.css";
import "./styles/transitions.css";

export { default as AccountProfile } from "./Account/Profile.vue";
export { default as AccountAvatar } from "./Account/Avatar.vue";
export { default as AccountBadge } from "./Account/Badge.vue";
export { default as AccountHome } from "./Account/Home.vue";
export { default as AccountMate } from "./Account/Mate.vue";
export { default as AccountMates } from "./Account/Mates.vue";
export { default as AccountStars } from "./Account/Stars.vue";

export { default as UserCredentials } from "./User/Credentials.vue";
export { default as UserPassphrase } from "./User/Pass.vue";
export { default as UserAuth } from "./User/Auth.vue";
export { default as UserLogin } from "./User/Login.vue";
export { default as UserHome } from "./User/Home.vue";
export { default as UserIcon } from "./User/Icon.vue";
export { default as UserPanel } from "./User/Panel.vue";
export { default as UserProfile } from "./User/Profile.vue";
export { default as UserProfileField } from "./User/Profile/Field.vue";

export { default as RelayIcon } from "./Relay/Icon.vue";

export { default as RoomProfile } from "./Room/Profile.vue";

export { default as SpacePlane } from "./Space/Plane.vue";
export { default as SpaceGuest } from "./Space/Guest.vue";

export { default as FeedList } from "./Feed/List.vue";
export { default as FeedLabel } from "./Feed/Label.vue";
export { default as FeedBlock } from "./Feed/Block.vue";

export { default as PostCard } from "./Post/Card.vue";
export { default as PostForm } from "./Post/Form.vue";
export { default as PostList } from "./Post/List.vue";
export { default as PostPage } from "./Post/Page.vue";
export { default as PostStar } from "./Post/Star.vue";

export { default as LogTree } from "./Log/Tree.vue";

export { default as QrShow } from "./Qr/Show.vue";
export { default as QrLoad } from "./Qr/Load.vue";

export { default as EmbedYoutube } from "./Embed/Youtube.vue";

export { default as UiModal } from "./Ui/Modal.vue";

export { default as UtilPulse } from "./Util/pulse.vue";
export { default as UtilGraph } from "./Util/graph.vue";
export { default as UtilShare } from "./Util/share.vue";
export { default as Utiltools } from "./Util/tools.vue";

export * from "@composables";

// dirty hack to get rid of a warning during build
import { resolveComponent } from "vue";
resolveComponent();
