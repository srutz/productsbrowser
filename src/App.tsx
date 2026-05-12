import { MyButton } from "./MyButton";

export function App() {
  return (
    <div
      className="w-screen h-screen flex 
    flex-col items-center justify-center p-4 gap-2"
    >
      <MyButton
        className="min-w-32 bg-red-600 hover:bg-red-700"
        onClick={() => alert("Button1 clicked!")}
      >
        Button 1
      </MyButton>
      <MyButton className="min-w-32" onClick={() => alert("Button2 clicked!")}>
        Button 2
      </MyButton>
    </div>
  );
}
