import {
    useImperativeHandle,
    type ComponentPropsWithoutRef,
    type Ref,
} from "react";
import { cn } from "./lib/utils";

export type MyButtonHandle = { clickTheButton: () => void };

export function MyButton({
  className,
  ref,
  ...props
}: {
  ref?: Ref<MyButtonHandle>;
} & ComponentPropsWithoutRef<"button">) {
  useImperativeHandle(
    ref,
    () => ({
      clickTheButton() {
        console.log("The button was clicked!");
      },
    }),
    [],
  );
  return <button {...props} className={cn("mybutton", className)} />;
}
