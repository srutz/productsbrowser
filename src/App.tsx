import { useRef } from "react";
import { MyButton, type MyButtonHandle } from "./MyButton";

export function App() {
  const ref = useRef<MyButtonHandle>(null);
  return (
    <div className="w-screen h-screen flex flex-col items-stretch justify-center bg-red-300 p-4">
      <div className="h-1 grow bg-blue-300">
        <MyButton ref={ref}>Click me</MyButton>
      </div>
    </div>
  );
}
