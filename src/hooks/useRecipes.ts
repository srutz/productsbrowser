import { useSuspenseQuery } from "@tanstack/react-query";
import type { RecipesRequest } from "../types";

export const PAGE_SIZE = 30;

export async function getRecipes({ page }: { page: number }, signal?: AbortSignal) {
  const response = await fetch(
    `https://dummyjson.com/recipes?limit=${PAGE_SIZE}&skip=${(page - 1) * PAGE_SIZE}`,
    { signal },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch recipes for page ${page}: ${response.statusText}`,
    );
  }
  return response.json() as Promise<RecipesRequest>;
}

export function useRecipes({ page }: { page: number }) {
  return useSuspenseQuery({
    queryKey: ["recipes", page],
    queryFn: ({ signal }) => getRecipes({ page }, signal),
    staleTime: 5 * 60 * 1000, // 5 
  });
}
