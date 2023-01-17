/**
 * Handle mouse movement inside an SVG
 * @module useMouse
 * */

import { useMousePressed, useMouseInElement } from "@vueuse/core";
import { ref, reactive, onMounted, onBeforeUnmount, watch } from "vue";
import type { Ref } from "vue";


/**
 * @interface {reactive} Mouse
 * @property {Number} x - absolute X coordinate to place a marker to
 * @property {Number} y - absolute Y coordinate to place a marker to
 * @property {Number} normX - [0-1] relative X coordinate
 * @property {Number} normY - [0-1] relative Y coordinate
 * @property {Boolean} pressed - is mouse pressed?
 * @property {Boolean} inside - is mouse inside the area?
 */

export interface Mouse {
  x: number
  y: number
  normX: number
  normY: number
  pressed: boolean
  inside: boolean
}

export interface useMouse {
  area: Ref
  mouse: Mouse
}

/**
 * Correct mouse position in an SVG space
 */

export function useSvgMouse(area = ref(null)): useMouse {

  const { pressed } = useMousePressed();

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
