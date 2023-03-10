import { useEffect } from "react";
import { animateColors } from "../animateColors";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

export const Visual = () => {
  useEffect(() => {
    const cancelAnimation = animateColors();
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => {
      cancelAnimation();
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  return <div />;
};

export default Visual;
