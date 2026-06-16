import type { Recipe } from "../types";

export function RecipePanel({ recipe }: { recipe: Recipe }) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden pt-4 px-4">
      <div className="grid md:grid-cols-2 gap-2">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
            {recipe.difficulty}
          </div>
        </div>

        <div className="px-8 py-2 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {recipe.cuisine}
            </span>
            {recipe.mealType.map((mt, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold"
              >
                {mt}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold text-zinc-900 mb-4">
            {recipe.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400" data-testid="rating-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(recipe.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="text-zinc-600 font-medium">
              {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-zinc-50 rounded-lg px-4 py-2">
              <div className="text-xs text-zinc-500">Prep</div>
              <div className="font-semibold text-zinc-900">
                {recipe.prepTimeMinutes} min
              </div>
            </div>
            <div className="bg-zinc-50 rounded-lg px-4 py-2">
              <div className="text-xs text-zinc-500">Cook</div>
              <div className="font-semibold text-zinc-900">
                {recipe.cookTimeMinutes} min
              </div>
            </div>
            <div className="bg-zinc-50 rounded-lg px-4 py-2">
              <div className="text-xs text-zinc-500">Total</div>
              <div className="font-semibold text-zinc-900">{totalTime} min</div>
            </div>
            <div className="bg-zinc-50 rounded-lg px-4 py-2">
              <div className="text-xs text-zinc-500">Servings</div>
              <div className="font-semibold text-zinc-900">
                {recipe.servings}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-green-600">
              {recipe.caloriesPerServing}
            </span>
            <span className="text-zinc-500 ml-2">kcal per serving</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {recipe.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200">
        <div className="grid md:grid-cols-2 gap-6 p-8">
          <div>
            <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2 text-xl">
              🥕 Ingredients
            </h3>
            <ul className="text-sm text-zinc-700 space-y-1 list-disc list-inside">
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-zinc-900 mb-3 flex items-center gap-2 text-xl">
              👨‍🍳 Instructions
            </h3>
            <ol className="text-sm text-zinc-700 space-y-2 list-decimal list-inside">
              {recipe.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
