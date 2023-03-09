import { CSSProperties, useEffect, useRef, useState } from "react";
import "./App.scss";
import { TaskCard } from "@fremtind/jkl-card-react";
import { TextArea } from "@fremtind/jkl-text-input-react";

function App() {
  const motionAmount = useRef(0.03);
  const animationRef = useRef<number>(0);

  const [rdegValue, setRdegValue] = useState("");
  const [gdegValue, setGdegValue] = useState("");
  const [bdegValue, setBdegValue] = useState("");
  const [mood, setMood] = useState(50);

  const rotateDegreeValue = (startValue = 0, prevTime?: number) => {
    const currentTime = Date.now();
    const timeStep = prevTime ? currentTime - prevTime : 0;

    let value = startValue + timeStep * motionAmount.current;
    if (value >= 365) {
      value = 0;
    }
    setRdegValue(`${value}deg`);
    let gdeg = value - 90;
    if (gdeg < 0) {
      gdeg += 365;
    }
    setGdegValue(`${gdeg}deg`);
    let bdeg = value + 90;
    if (bdeg > 365) {
      bdeg -= 365;
    }
    setBdegValue(`${bdeg}deg`);

    animationRef.current = requestAnimationFrame(() =>
      rotateDegreeValue(value, currentTime)
    );
  };

  useEffect(() => {
    rotateDegreeValue();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const isWorkHours = () => {
    const now = new Date();

    if (now.getDay() === 6 || now.getDay() === 0) return false;

    if (now.getHours() < 7 || now.getHours() > 19) return false;

    return true;
  };

  return (
    <main className="jkl page">
      <div
        className="gradient"
        style={
          {
            "--rdeg": rdegValue,
            "--gdeg": gdegValue,
            "--bdeg": bdegValue,
            filter: `saturate(${mood}%)`,
          } as CSSProperties
        }
      />
      {isWorkHours() && (
        <form
          className="form"
          onSubmit={(event) => {
            event.preventDefault();

            console.log(event);
          }}
        >
          <TaskCard className="form-card" padding="l">
            <h1 className="jkl-heading-2 jkl-spacing-24--bottom">
              Hvordan føler du deg i dag, <em>egentlig</em>?
            </h1>
            <input
              className="slider jkl-spacing-24--bottom"
              style={{
                accentColor: `rgb(${rdegValue}, ${mood}, 50)`,
              }}
              type="range"
              min={0}
              max={100}
              value={mood}
              onChange={(event) => setMood(parseInt(event.target.value))}
            />
            <TextArea label="Har du noe på hjertet?" />
          </TaskCard>
          <div className="button-container">
            <button className="submit-button">Sånn!</button>
          </div>
        </form>
      )}
    </main>
  );
}

export default App;
