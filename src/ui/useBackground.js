/**
 * @module Background
 * @group UI
 */

import { gunAvatar } from "../composables";
import { theme } from "./useTheme";

/**
 * @typedef {Object} BackgroundOptions
 * @property {string} pub
 * @property {number} [size=200]
 * @property {number} [light=0.5]
 * @property {number} [overlay=0.5]
 * @property {('squares'|'circles')} [draw='squares']
 * @property {string} [attachment='fixed']
 */

/**
 * @param {BackgroundOptions} options
 * @returns {Object|undefined}
 */
export function useBackground({
	pub,
	size = 200,
	light = 0.5,
	overlay = 0.5,
	draw = "squares",
	attachment = "fixed",
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
			})})`,
		backgroundSize: "cover, cover",
		backgroundAttachment: `${attachment},${attachment}`,
	};
}
