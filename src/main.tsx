import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "./routeTree.gen.ts";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfirmDialog } from "./ui/ConfirmDialog.tsx";
import { renderToString } from 'react-dom/server';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
  
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const client = new QueryClient();
/*
for (let i = 40; i < 60; i++) {
  client.ensureQueryData({
    queryKey: [ "quote", i ],
    queryFn: () => getQuote(i)
  })
}
*/

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <ConfirmDialog />
    </QueryClientProvider>
);

