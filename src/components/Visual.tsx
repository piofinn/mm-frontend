import { CSSProperties, useEffect, useRef, useState } from "react";






const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};

export const Visual=()=> {
  const motionAmount = useRef(0.03);
  const animationRef = useRef<number>(0);

  const [rdegValue, setRdegValue] = useState("");
  const [gdegValue, setGdegValue] = useState("");
  const [bdegValue, setBdegValue] = useState("");
  const [mood, setMood] = useState(50);
  const [message, setMessage] = useState("");

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
    window.addEventListener("resize", appHeight);
    appHeight();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  return (
  
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
   
  );
}

export default Visual;
