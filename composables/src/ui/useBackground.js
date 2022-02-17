import { gunAvatar } from "..";

export function useBackground({
  pub,
  size = 200,
  light = 0.5,
  overlay = 0.5,
  draw = "squares",
  attachment = "fixed",
} = {}) {
  if (!pub) return;

  return {
    background: `linear-gradient(hsla(255,0%,${
      light * 100
    }%,${overlay}), hsla(255,0%,${light * 100}%,${overlay})), url(${gunAvatar({
      pub: pub,
      draw,
      reflect: false,
      size: size,
    })})`,
    backgroundSize: "cover, cover",
    backgroundAttachment: `${attachment},${attachment}`,
  };
}
