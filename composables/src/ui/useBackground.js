import { gunAvatar } from "..";

export function useBackground(pub, size = 200, light = 0.5, draw = "squares") {
  if (!pub) return;

  return {
    background: `linear-gradient(hsla(255,0%,100%,${light}), hsla(255,0%,40%,${light})), url(${gunAvatar(
      { pub: pub, draw, reflect: false, size: size }
    )})`,
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
  };
}
