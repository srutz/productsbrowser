import { useQueryClient } from "@tanstack/react-query";
import { getRecipes } from "./useRecipes";
import { preloadImage } from "../lib/preloadImage";

/* this method is used to prefetch recipes and their images when the user is browsing the recipes list.
 */
export function usePrefetchRecipePages() {
  const queryClient = useQueryClient();
  return (fromPage: number, toPage: number) => {
    (async () => {
      for (let page = fromPage; page <= toPage; page++) {
        const recipes = await queryClient.ensureQueryData({
          queryKey: ["recipes", page],
          queryFn: ({ signal }) => getRecipes({ page }, signal),
        });
        if (recipes && recipes.recipes) {
          for (const recipe of recipes.recipes) {
            preloadImage(recipe.image);
          }
        }
        console.log("prefetched recipe-page " + page);
        await delay(100); // avoid being blocked
      }
    })();
  }
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} 