/** Client-only device helpers */

export function isTouchOrMobile(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 768px)").matches;
    const touch = navigator.maxTouchPoints > 0;
    return coarse || narrow || touch;
  } catch {
    return false;
  }
}

export function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}
