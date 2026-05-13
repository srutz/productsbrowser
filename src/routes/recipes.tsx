import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return <Outlet />;
}
