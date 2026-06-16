import { useNavigate } from "react-router";
import { PAGE_SIZE, useRecipes } from "../hooks/useRecipes";
import type { Recipe } from "../types";
import { Pager } from "./Pager";
import { RecipeThumb } from "./RecipeThumb";

export function RecipesGrid({ page }: { page: number }) {
  const { data: recipesResponse } = useRecipes({ page });
  const navigate = useNavigate();
  const handleRecipeClick = (recipe: Recipe) => {
    navigate("/recipe/" + recipe.id);
  };
  const totalPages = Math.max(1, Math.ceil(recipesResponse.total / PAGE_SIZE));
  return (
    <div className="grow flex flex-col gap-4">
      <Pager
        page={page}
        totalPages={totalPages}
        onNavigate={(p) =>
          navigate("/recipes/page/" + p)
        }
      />
      <div className="flex flex-wrap justify-center gap-4">
        {recipesResponse.recipes.map((recipe) => (
          <button
            key={recipe.id}
            type="button"
            onClick={() => handleRecipeClick(recipe)}
          >
            <RecipeThumb key={recipe.id} recipe={recipe}></RecipeThumb>
          </button>
        ))}
      </div>
    </div>
  );
}
