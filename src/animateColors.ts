let currentAnimation = 0;

export const animateColors = (startValue = 0, prevTime?: number) => {
  const currentTime = Date.now();
  const timeStep = prevTime ? currentTime - prevTime : 0;

  let value = startValue + timeStep * 0.05; // motionAmount.current;
  if (value >= 365) {
    value = 0;
  }
  document.querySelector("body")?.style.setProperty("--rdeg", `${value}deg`);
  let gdeg = value - 90;
  if (gdeg < 0) {
    gdeg += 365;
  }
  document.querySelector("body")?.style.setProperty("--gdeg", `${gdeg}deg`);
  let bdeg = value + 90;
  if (bdeg > 365) {
    bdeg -= 365;
  }
  document.querySelector("body")?.style.setProperty("--bdeg", `${bdeg}deg`);

  currentAnimation = requestAnimationFrame(() =>
    animateColors(value, currentTime)
  );

  return () => cancelAnimationFrame(currentAnimation);
};
