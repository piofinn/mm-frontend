import { useQuery } from "@tanstack/react-query";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { animateColors } from "../animateColors";
import { getAll, getMood } from "../api";
import { SpeechBubble } from "./SpeechBubble";

import "./Visual.scss";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

export const Visual = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["all"],
    queryFn: () => getAll(),
    staleTime: 30000,
    refetchInterval: 60000,
  });
  const [message, setMessage] = useState("");
  const [mood, setMood] = useState(0.5);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cancelAnimation = animateColors();
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => {
      cancelAnimation();
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!data) return;

      let entry = data[Math.round(Math.random() * data.length)];
      while (entry[1] === "") {
        entry = data[Math.round(Math.random() * data.length)];
      }
      setMood(entry[0]);
      setMessage(entry[1]);

      overlayRef.current?.style.setProperty(
        "backdrop-filter",
        `saturate(${Math.round(entry[0] * 100)}%)`
      );
      overlayRef.current?.style.setProperty(
        "-webkit-backdrop-filter",
        `saturate(${Math.round(entry[0] * 100)}%)`
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) {
    return null;
  } else if (error) {
    console.error(error);
    return null;
  } else if (!data) {
    return null;
  }

  return (
    <>
      <div
        ref={overlayRef}
        className="jkl overlay"
        style={
          {
            "--mood": `${Math.round(mood * 100)}%`,
          } as CSSProperties
        }
      >
        <SpeechBubble message={message} />
      </div>
    </>
  );
};

export default Visual;
