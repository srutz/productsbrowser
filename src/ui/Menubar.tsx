import { Link } from "@tanstack/react-router";
import { LuShoppingBag } from "react-icons/lu";

export function Menubar() {
  return (
    <div className="px-4 py-2 border-b border-gray-300 flex gap-4 items-center">
      <LuShoppingBag size={30}></LuShoppingBag>
      <Link to="/">Home</Link>
      <Link to="/products/page/{-$page}" params={{ page: 1 }}>
        Products
      </Link>
      <Link to="/about">About</Link>
    </div>
  );
}
