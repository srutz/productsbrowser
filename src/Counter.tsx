import { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { SegmentedDisplaySimple } from "./SegmentedDisplaySimple";
import { SegmentedDisplayWithOptions } from "./SegmentedDisplayWithOptions";

export function Counter() {
  "use no memo";

  const [tick, setTick] = useState(1);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
    }, 1_000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="p-4 bg-gray-100 rounded flex flex-col items-start gap-3">
      <div className="text-gray-500">Tick {tick}</div>
      <SegmentedDisplaySimple count={count} />
      <SegmentedDisplayWithOptions options={{ count }} />
      <MyButton onClick={() => setCount(count + 1)}>Increment</MyButton>
    </div>
  );
}
