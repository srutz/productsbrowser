import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { useRecipe } from "../hooks/useRecipe";
import { RecipePanel } from "../ui/RecipePanel";

const paramsSchema = z.object({
  recipeId: z.coerce.number().int().nonnegative(),
});

export const Route = createFileRoute("/recipe/$recipeId")({
  params: {
    parse: (raw) => paramsSchema.parse(raw),
    stringify: ({ recipeId }) => ({ recipeId: recipeId.toString() }),
  },
  component: RouteComponent,
});

// eslint-disable-next-line react-refresh/only-export-components
function RouteComponent() {
  const { recipeId } = Route.useParams();
  const { data: recipe } = useRecipe(recipeId);
  return (
    <div>
      <RecipePanel recipe={recipe}></RecipePanel>
    </div>
  );
}
