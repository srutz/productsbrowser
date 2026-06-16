import { usePrefetchRecipeAndImage } from "@/hooks/usePrefetchRecipeAndImage";
import { useEffect } from "react";
import { Outlet, useLocation, type Location } from "react-router";
import { Menubar } from "../ui/Menubar";


export function RootPage() {
  const recipePrefetcher = usePrefetchRecipeAndImage();
  useEffect(() => {
    recipePrefetcher(1, 50);
  }, [recipePrefetcher])

  return (
    <div className="w-screen h-screen flex flex-col items-stretch justify-center bg-background">
      <Menubar></Menubar>
      <div className="h-1 grow bg-card p-4 overflow-auto">
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
  const location = useLocation();
  useEffect(() => {
    logLocationToServer(location)
  }, [location])

  return (
    <footer className="py-1 px-4 border-t border-gray-300">
      Footer: {location.pathname}
    </footer>
  )
}
