import { useFormState } from "@/hooks/useFormState";
import { usePrefetchRecipeAndImage } from "@/hooks/usePrefetchRecipeAndImage";
import { usePrefetchRecipePages } from "@/hooks/usePrefetchRecipePages";
import { useEffect } from "react";
import { Outlet, useLocation, type Location } from "react-router";
import { Menubar } from "../ui/Menubar";


export function RootPage() {
  const recipePrefetcher = usePrefetchRecipeAndImage();
  useEffect(() => {
    //recipePrefetcher(1, 50);
  }, [recipePrefetcher])

  const recipePagePrefetcher = usePrefetchRecipePages();
  useEffect(() => {
    //recipePagePrefetcher(1, 2);
  }, [recipePagePrefetcher])

  return (
    <div className="w-screen h-screen flex flex-col items-stretch justify-center bg-background">
      <Menubar></Menubar>
      <div className="h-1 grow bg-card p-4 overflow-auto bg-zinc-100">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
};

function logLocationToServer(location: Location) {
  console.log(">>> LOG VISIT: ", location.pathname)
}

// eslint-disable-next-line react-refresh/only-export-components
function Footer() {

  //const [form] = useLocalStorage<{ email: string }>("form1")
  const email = useFormState(state => state.form.email)

  const location = useLocation();
  useEffect(() => {
    logLocationToServer(location)
  }, [location])

  return (
    <footer className="py-1 px-4 border-t border-gray-300">
      Footer: {location.pathname}
      / EMail: {email}
    </footer>
  )
}
