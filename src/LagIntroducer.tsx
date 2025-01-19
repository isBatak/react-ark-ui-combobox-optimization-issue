import { useState, useEffect } from "react";
import { Checkbox } from "~/components/ui/checkbox";

function getRandomLag() {
  return Math.floor(Math.random() * 300);
}

export const LagInducer = () => {
  const [enable, setEnable] = useState(false);
  const [lag, setLag] = useState(0);

  useEffect(() => {
    if (!enable) {
      return () => {};
    }

    const intervalId = setInterval(() => {
      const t1 = getRandomLag() + Date.now();
      setLag(t1 - Date.now());
      while (Date.now() < t1); // Induces lag
    }, getRandomLag()); // Randomize the interval timing

    return () => {
      clearInterval(intervalId);
    };
  }, [enable]);

  return (
    <div id="lagger">
      <label>
        Induce random Lag:
        <Checkbox checked={enable} onChange={() => setEnable(!enable)} />
      </label>
      <span id="val">{lag}</span>ms
    </div>
  );
};
