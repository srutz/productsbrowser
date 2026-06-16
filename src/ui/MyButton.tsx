import type { ComponentProps, ReactNode } from "react";
import { cn } from "../lib/utils";

/*
 * a button component that accepts all the props of a regular button incl. children.
 * this component can accept additional class names through the className prop.
 */
export function MyButton({
  children,
  className,
  ...rest
}: {
  children: ReactNode;
} & ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center shadow-xl rounded-md px-4 py-2 text-sm font-medium transition cursor-pointer",
        "text-white bg-blue-600 hover:bg-blue-700",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
