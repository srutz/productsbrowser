import { memo } from "react";
import { cn } from "./lib/utils";

// 7-segment display dimensions
const W = 24,
  H = 44,
  T = 4,
  GAP = 1,
  MID = H / 2;

// Segment rectangles: [a, b, c, d, e, f, g]
// a=top, b=top-right, c=bot-right, d=bottom, e=bot-left, f=top-left, g=middle
const SEG_RECTS = [
  { x: T + GAP, y: GAP, w: W - 2 * T - 2 * GAP, h: T }, // a
  { x: W - T - GAP, y: T + GAP, w: T, h: MID - 2 - T - 2 * GAP }, // b
  { x: W - T - GAP, y: MID + 2 + GAP, w: T, h: H - T - GAP - (MID + 2 + GAP) }, // c
  { x: T + GAP, y: H - T - GAP, w: W - 2 * T - 2 * GAP, h: T }, // d
  { x: GAP, y: MID + 2 + GAP, w: T, h: H - T - GAP - (MID + 2 + GAP) }, // e
  { x: GAP, y: T + GAP, w: T, h: MID - 2 - T - 2 * GAP }, // f
  { x: T + GAP, y: MID - 2, w: W - 2 * T - 2 * GAP, h: T }, // g
];

// Which segments are lit per digit [a,b,c,d,e,f,g]
const DIGITS: Record<string, boolean[]> = {
  "0": [true, true, true, true, true, true, false],
  "1": [false, true, true, false, false, false, false],
  "2": [true, true, false, true, true, false, true],
  "3": [true, true, true, true, false, false, true],
  "4": [false, true, true, false, false, true, true],
  "5": [true, false, true, true, false, true, true],
  "6": [true, false, true, true, true, true, true],
  "7": [true, true, true, false, false, false, false],
  "8": [true, true, true, true, true, true, true],
  "9": [true, true, true, true, false, true, true],
};

function Digit({ char }: { char: string }) {
  const segs = DIGITS[char] ?? Array(7).fill(false);
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      {SEG_RECTS.map((r, i) => (
        <rect
          key={i}
          x={r.x}
          y={r.y}
          width={r.w}
          height={r.h}
          fill={segs[i] ? "#39ff14" : "#172217"}
        />
      ))}
    </svg>
  );
}

export function SegmentedDisplaySimple({ count }: { count: number }) {
  console.log(
    "render SegmentedDisplaySimple",
    count,
    new Date().toLocaleTimeString(),
  );
  return (
    <div
      className={cn(
        "min-w-48 bg-gray-900 rounded flex items-center justify-center p-2 gap-1 rounded-lg",
      )}
    >
      {count
        .toString()
        .split("")
        .map((d, i) => (
          <Digit key={i} char={d} />
        ))}
    </div>
  );
}
