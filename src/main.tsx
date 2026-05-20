/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from "nuqs/adapters/react";
import { StrictMode, type ComponentProps } from "react";
import { createRoot } from "react-dom/client";
import { LuZap } from "react-icons/lu";
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from "react-router";
import { QuoteDisplay } from "./App";
import "./index.css";
import { cn } from "./lib/utils";

const router = createBrowserRouter([{
  path: "/", element: <Root/>, children: [
    { path: "/", element: <Main/> },
    { path: "/quotes/:id", element: <QuoteDisplay/> },
    { path: "/quotes", element: <QuoteDisplay/> },
    { path: "/about", element: <About/> },
    { path: "/form", element: <Form/> },
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
      <NavLink to="/quotes">Quotes</NavLink>
      <NavLink to="/form">Form</NavLink>
      <NavLink to="/about">About</NavLink>
    </div>)
}

function Footer() {
  return <div className="border-t border-gray-400 py-2 px-4 bg-zinc-100 
    flex justify-end">Greetings from Köln</div>
}

const client = new QueryClient();
const rootElement = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(rootElement);
reactRoot.render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
      <ReactQueryDevtools client={client}/>
    </NuqsAdapter>
  </StrictMode>,
);


function Form() {
  return (<VBox className="gap-8">
    <VBox>
      <Label htmlFor="input1">Vorname</Label>
      <Input aria-id="input1" placeholder="Vorname eingeben"></Input>
    </VBox>
    <VBox className="shadow-xl">
      <Label htmlFor="input2">E-Mail</Label>
      <Input id="input2" placeholder="E-Mail eingeben" type="email"></Input>
    </VBox>
  </VBox>)}

function Label({ type, ...props }: ComponentProps<"label"> & { type?: "warning" | "error" }) {
  return (<label {...props} 
    className={cn( 
      type === "error" && "font-bold text-red-700",
      type === "warning" && "text-green-700",
    )}/>)
}

function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <input className="py-2 px-2 border border-gray-200" {...props}></input>
    </div>)
}

function VBox({ className, ...props }: ComponentProps<"div">) {
  return (<div {...props} className={cn("flex flex-col gap-2", className)} />
)}

function HBox({ className, ...props }: ComponentProps<"div">) {
  return (<div {...props} className={cn("flex items-center gap-2", className)} />
)}

