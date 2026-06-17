
//import "./reacthook"


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";

import { HomePage } from "./routes/HomePage.tsx";
import { RootPage } from "./routes/RootPage.tsx";
import { ConfirmDialog } from "./ui/ConfirmDialog.tsx";


// Set up a Router instance

// /recipe/3

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "recipes/page/:page",
        //element: <RecipesPage />
        lazy: () => import("./routes/RecipesPage.tsx")
      },
      {
        path: "recipe/:recipeId",
        //element: <RecipePage />
        lazy: () => import("./routes/RecipePage.tsx")
      },
      {
        path: "about",
        //lazy: function () { return import("./routes/AboutPage") }
        lazy: () => import("./routes/AboutPage")
      },
      {
        path: "*",
        element: <div>Wir haben diesen Content nicht</div>
      },
    ]
  },
]);

const client = new QueryClient();


createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
    <ConfirmDialog />
  </QueryClientProvider>
);

