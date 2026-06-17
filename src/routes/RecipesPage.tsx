import { RecipesGrid } from "@/ui/RecipesGrid";
import { useParams } from "react-router";

console.log("RECIPES LOADED")

export function RecipesPage() {
  const { page } = useParams();
  const pageNumber = parseInt(page || "1");
  return <RecipesGrid page={pageNumber} />;
}


export { RecipesPage as Component };
