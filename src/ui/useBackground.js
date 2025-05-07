import { gunAvatar } from "../composables";
import { theme } from "./useTheme";

export function useBackground({
	pub,
	size = 500,
	light = 0.5,
	overlay = 0.5,
	draw = "squares",
	attachment = "fixed",
	round = false
}) {
	if (!pub) return;

	return {
		background: `linear-gradient(hsla(255,0%,${light * 100
			}%,${overlay}), hsla(255,0%,${light * 100}%,${overlay})), url(${gunAvatar({
				pub: pub,
				draw,
				reflect: false,
				size: size,
				dark: theme.dark,
				round
			})})`,
		backgroundSize: "cover, cover",
		backgroundAttachment: `${attachment},${attachment}`,
	};
}
