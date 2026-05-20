/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import { memo, StrictMode, useState, type ComponentProps } from "react";
import { createRoot } from "react-dom/client";
import { LuZap } from "react-icons/lu";
import { createBrowserRouter, NavLink, Outlet, RouterProvider } from "react-router";
import { QuoteDisplay } from "./App";
import { Clock } from "./Clock";
import "./index.css";
import { cn } from "./lib/utils";
import { MyButton } from "./MyButton";
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
  </div>)
}


function Main() { return (<div>Hello to my app</div>)}

function About() { 
  return (<div><Clock /></div>)
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


const client = new QueryClient();
const rootElement = document.getElementById("root") as HTMLElement;
const reactRoot = createRoot(rootElement);
reactRoot.render(
  <StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NuqsAdapter>
  </StrictMode>,
);


function Form() {
  const [ form, setForm ] = useState({
    firstname: "",
    email: "",   
  })
  const config = { complete: !!form.email && !!form.firstname}
  console.log("render", form)
  let valid = true
  return (<VBox className="gap-8">
    <VBox>
      <Label htmlFor="input1">Vorname</Label>
      <Input id="input1" placeholder="Vorname eingeben" value={form.firstname}
        onChange={(e) => setForm({
          ...form,
          firstname: e.currentTarget.value,
        })}></Input>
        {
          (valid &&= form.firstname.length <= 3) && <div className="text-sm text-red-500">
            Vorname zu kurz
          </div>
        }
    </VBox>
    <VBox className="shadow-xl">
      <Label htmlFor="input2" >E-Mail</Label>
      <Input id="input2" placeholder="E-Mail eingeben" type="email" value={form.email}
        onChange={(e) => setForm({
          ...form,
          email: e.currentTarget.value,
        })}></Input>
    </VBox>
    <VBox className="justify-end self-start">
      <CompleteIndicator_ config={config} />
      <MyButton disabled={valid}>Submit</MyButton>
    </VBox>
  </VBox>)}

export const CompleteIndicator = memo(CompleteIndicator_, 
  (prev, next) => prev.config.complete === next.config.complete
)

function CompleteIndicator_({ config }: { config: { complete: boolean } }) {
  const { complete } = config
  console.log("render complete indicator", complete)
  return (<div><TagChild/>Complete={complete ? "Ja" : "Nein"}</div>)
}

function TagChild() {
  "use no memo"
  console.log("render tag child")
  return (<span className="text-sm text-red-500">[TagChild] </span>)
}


const Label = memo(Label_)

function Label_({ ...props }: ComponentProps<"label">) {
  console.log("render label")
  return (<label {...props}>{props.children} {new Date().toLocaleTimeString()}</label>)
}

function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <input className="py-2 px-2 border border-gray-200" {...props}></input>
    </div>)
}


export function VBox({ className, ...props }: ComponentProps<"div">) {
  return (<div {...props} className={cn("flex flex-col gap-2", className)} />
)}

export function HBox({ className, ...props }: ComponentProps<"div">) {
  return (<div {...props} className={cn("flex items-center gap-2", className)} />
)}




export function InputComponent() {
    const [value, setValue] = useState('')

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    return (
        <input type="text" value={value} onChange={handleChange} />
    )
}


// useMemo()
// useCallback()
// memo()
