import { RecipesGrid } from "@/ui/RecipesGrid";
import { useParams } from "react-router";

export function RecipesPage() {
  const { page } = useParams();
  const pageNumber = parseInt(page || "1");
  return <RecipesGrid page={pageNumber} />;
}
