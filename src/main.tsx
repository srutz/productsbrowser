/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LuZap } from "react-icons/lu";
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from "react-router";
import "./index.css";


const router = createBrowserRouter([{
  path: "/", element: <Root/>, children: [
    { path: "/", element: <Main/> },
    { path: "/about", element: <About/> },
  ]
}])

function Root() {
  return (
  <div className="w-screen h-screen bg-white flex flex-col gap-2">
    <Menubar></Menubar>
    <div className="grow p-4 overflow-y-auto"><Outlet/></div>
    <Footer />
  </div>)
}

function Main() { return (<div>Hello to my app</div>)}

function About() { 
  return (<div>About this app</div>)
}

function Menubar() {
  return (
    <div className="flex gap-4 p-4 border-b border-gray-400 bg-zinc-100 items-center">
      <LuZap size={32}></LuZap>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>)
}

function Footer() {
  return <div className="border-t border-gray-400 py-2 px-4 bg-zinc-100 
    flex justify-end">Greetings from Köln</div>
}

const SHOW_REACT_QUERY_DEVTOOLS = !true;
const client = new QueryClient();
const rootElement = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(rootElement);
reactRoot.render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      {SHOW_REACT_QUERY_DEVTOOLS && <ReactQueryDevtools client={client}/>}
    </NuqsAdapter>
  </StrictMode>,
);



