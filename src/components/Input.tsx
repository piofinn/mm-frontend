import { useCallback, useEffect, useRef, useState } from "react";
import { TaskCard } from "@fremtind/jkl-card-react";
import { TextArea } from "@fremtind/jkl-text-input-react";
import { animateColors } from "../animateColors";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

function Input() {
  const [mood, setMood] = useState(50);
  const [message, setMessage] = useState("");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.style.setProperty("--saturation", `${mood}%`);
    mainRef.current?.style.setProperty("backdrop-filter", `saturate(${mood}%)`);
    mainRef.current?.style.setProperty(
      "-webkit-backdrop-filter",
      `saturate(${mood}%)`
    );
  }, [mood]);

  useEffect(() => {
    const cancelAnimation = animateColors();
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => {
      cancelAnimation();
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  const isWorkHours = () => {
    const now = new Date();

    if (now.getDay() === 6 || now.getDay() === 0) return false;

    if (now.getHours() < 7 || now.getHours() > 19) return false;

    return true;
  };

  const postDataToDatabase: React.FormEventHandler = useCallback((event) => {
    event.preventDefault();

    fetch("https://zeeq.pythonanywhere.com/write", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        mood: mood / 100,
        feeling: message,
      }),
    });

    setMood(50);
    setMessage("");
  }, []);

  return (
    <main data-theme="light" className="jkl page" ref={mainRef}>
      {isWorkHours() && (
        <form className="form" onSubmit={postDataToDatabase}>
          <TaskCard className="form-card" padding="l">
            <h1 className="jkl-heading-2 jkl-spacing-24--bottom">
              Hvordan føler du deg i dag, <em>egentlig</em>?
            </h1>
            <input
              className="slider jkl-spacing-24--bottom"
              type="range"
              min={0}
              max={100}
              value={mood}
              onChange={(event) => setMood(parseInt(event.target.value))}
            />
            <TextArea
              label="Har du noe på hjertet?"
              helpLabel="Alt du skriver her er selvfølgelig helt anonymt"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={4}
            />
          </TaskCard>
          <div className="button-container">
            <button className="submit-button">Sånn!</button>
          </div>
        </form>
      )}
      {!isWorkHours() && (
        <p className="jkl-heading-1">Kom tilbake i arbeidstiden!</p>
      )}
    </main>
  );
}

export default Input;
