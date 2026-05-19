import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";

const client = new QueryClient();

const rootElement = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(rootElement);
reactRoot.render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={client}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>,
);
