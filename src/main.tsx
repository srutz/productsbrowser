
//import "./reacthook"


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { AboutPage } from "./routes/AboutPage.tsx";
import { HomePage } from "./routes/HomePage.tsx";
import { RecipePage } from "./routes/RecipePage.tsx";
import { RecipesPage } from "./routes/RecipesPage.tsx";
import { RootPage } from "./routes/RootPage.tsx";
import { ConfirmDialog } from "./ui/ConfirmDialog.tsx";

// Set up a Router instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "recipes/page/:page",
        element: <RecipesPage />
      },
      {
        path: "recipe/:recipeId",
        element: <RecipePage />
      },
      {
        path: "about",
        element: <AboutPage />
      }
    ]
  }
]);

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

