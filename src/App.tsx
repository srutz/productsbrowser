import type { ComponentProps, ReactNode } from "react";
import { cn } from "./lib/utils";

export function App() {
  return (
    <div
      className="w-screen h-screen flex 
    flex-col items-stretch justify-center p-4 gap-2"
    >
      Window size {window.innerWidth} x {window.innerHeight}
      <MyButton className=" ">wdwqd</MyButton>
    </div>
  );
}

function MyButton(
  props: {
    children: ReactNode;
  } & ComponentProps<"button">,
) {
  const { children, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition",
        "hover:bg-blue-700",
        "shadow-xl",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {children}
    </button>
  );
}
