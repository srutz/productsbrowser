import { useSuspenseQuery } from "@tanstack/react-query";
import type { Recipe } from "../types";

export async function getRecipe(id: number, signal?: AbortSignal): Promise<Recipe> {
  const response = await fetch(`https://dummyjson.com/recipes/${id}`, { signal });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch recipe with id ${id}: ${response.statusText}`,
    );
  }
  return response.json();
}

export function useRecipe(id: number) {
  return useSuspenseQuery({
    queryKey: ["recipe", id],
    queryFn: ({ signal }) => getRecipe(id, signal),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
