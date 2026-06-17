import { useFormState } from "@/hooks/useFormState";
import { LuShoppingBag } from "react-icons/lu";
import { Link } from "react-router";

export function Menubar() {
  const form = useFormState(state => state.form)
  return (
    <div className="px-4 py-2 border-b border-gray-300 flex gap-4 items-center">
      <LuShoppingBag size={30}></LuShoppingBag>
      <Link to="/">Home</Link>
      <Link to="/recipes/page/1">
        Recipes
      </Link>
      <Link to="/about">About</Link>
      <div className="grow"></div>
      <div>{form.email}</div>
    </div>
  );
}
