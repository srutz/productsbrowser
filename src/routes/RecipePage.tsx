import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useRecipe } from "../hooks/useRecipe";
import { RecipePanel } from "../ui/RecipePanel";

export function RecipePage() {
  const navigate = useNavigate();
  const { recipeId } = useParams();
  const recipeIdNumber = parseInt(recipeId || "1");
  const { data: recipe } = useRecipe(recipeIdNumber);
  const go = (delta: number) => {
    const newId = recipeIdNumber + delta;
    if (newId > 0) {
      navigate("/recipe/" + newId);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-center mb-2">
        <Button className="w-[144px]" variant="outline" onClick={() => go(-1)}>Previous</Button>
        <Button className="w-[144px]" variant="outline" onClick={() => go(+1)}>Next</Button>
      </div>
      <RecipePanel recipe={recipe}></RecipePanel>
    </div >
  );
}
