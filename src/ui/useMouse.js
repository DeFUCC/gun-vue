/**
 * Handle mouse movement inside an SVG
 * @module Mouse
 * @group UI
 * */

import { useMousePressed, useMouseInElement } from "@vueuse/core";
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";

/**
 * @typedef {Object} Mouse
 * @property {number} x - absolute X coordinate to place a marker to
 * @property {number} y - absolute Y coordinate to place a marker to
 * @property {number} normX - [0-1] relative X coordinate
 * @property {number} normY - [0-1] relative Y coordinate
 * @property {boolean} pressed - is mouse pressed?
 * @property {boolean} inside - is mouse inside the area?
 */

/**
 * @typedef {Object} useMouse
 * @property {import('vue').Ref} area
 * @property {Mouse} mouse
 */

/**
 * Correct mouse position in an SVG space
 * @param {import('vue').Ref} [area=ref(null)]
 * @returns {useMouse}
 */
export function useSvgMouse(area = ref(null)) {
	const { pressed } = useMousePressed();

	/** @type {Mouse} */
	const mouse = reactive({
		x: 0,
		y: 0,
		normX: 0,
		normY: 0,
		pressed,
		inside: false,
	});

	onMounted(() => {
		document.addEventListener("mousemove", getCursorPosition);
		const { isOutside } = useMouseInElement(area);
		watch(isOutside, (out) => {
			mouse.inside = !out;
		});
	});

	onBeforeUnmount(() => {
		document.removeEventListener("mousemove", getCursorPosition);
	});

	/**
	 * @param {MouseEvent} event
	 * @param {SVGElement} [rect=area.value]
	 * @param {boolean} [corr=false]
	 */
	function getCursorPosition(event, rect = area.value, corr = false) {
		const svgElement = rect.closest("svg");
		if (!svgElement) return;
		var svgPoint = svgElement.createSVGPoint();
		svgPoint.x = event.clientX;
		svgPoint.y = event.clientY;
		let correct = svgPoint.matrixTransform(svgElement.getScreenCTM().inverse());
		if (corr) {
			let bounds = rect.getBBox();
			mouse.x =
				correct.x < bounds.width
					? correct.x < 0
						? 0
						: correct.x
					: bounds.width;
			mouse.y =
				correct.y < bounds.height
					? correct.y < 0
						? 0
						: correct.y
					: bounds.height;
			mouse.normY = mouse.y / bounds.height;
			mouse.normX = mouse.x / bounds.width;
		} else {
			mouse.x = correct.x;
			mouse.y = correct.y;
		}
	}

	return {
		area,
		mouse,
	};
}
