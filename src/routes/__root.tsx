import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Menubar } from "../ui/Menubar";

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen h-screen flex flex-col items-stretch justify-center bg-background">
      <Menubar></Menubar>
      <div className="h-1 grow bg-card p-4 overflow-auto">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
});
