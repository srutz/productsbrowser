import { createFileRoute } from "@tanstack/react-router";
import { RecipesGrid } from "../ui/RecipesGrid";

export const Route = createFileRoute("/recipes/")({
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  return <RecipesGrid page={1} />;
}
