import { useQueryClient } from "@tanstack/react-query";
import { getRecipe } from "./useRecipe";

/* this method is used to prefetch recipes and their images when the user is browsing the recipes list. 
 */
export function usePrefetchRecipeAndImage() {
  const queryClient = useQueryClient();
  return (fromRecipeId: number, toRecipeId: number) => {
    (async () => {
      for (let id = fromRecipeId; id <= toRecipeId; id++) {
        const recipe = await queryClient.ensureQueryData({
          queryKey: ["recipe", id],
          queryFn: ({ signal }) => getRecipe(id, signal),
        });
        if (recipe) {
          const image = new Image();
          image.src = recipe.image;
        }
        console.log("prefetched recipe " + id);
        await delay(100); // avoid being blocked
      }
    })();
  }
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
} 