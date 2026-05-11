import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";



const rootElement = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(rootElement);
reactRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
