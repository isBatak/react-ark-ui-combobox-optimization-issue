import { useState, useEffect, useRef } from "react";
import { Slider } from "~/components/ui/slider";

export const LagInducer = () => {
  const [lag, setLag] = useState(0);
  const lagRef = useRef(lag);

  useEffect(() => {
    lagRef.current = lag;
  }, [lag]);

  useEffect(() => {
    const lagMe = () => {
      const t1 = lagRef.current + Date.now();
      while (Date.now() < t1); // Induces lag
      window.requestAnimationFrame(lagMe);
    };

    const animationId = window.requestAnimationFrame(lagMe);

    return () => {
      window.cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div id="lagger">
      <label>
        Induce Lag:
        <Slider
          value={[lag]}
          min={0}
          max={1000}
          onValueChange={(value) => setLag(value.value[0])}
          w="200px"
        />
      </label>
      <span id="val">{lag}</span>ms
    </div>
  );
};
