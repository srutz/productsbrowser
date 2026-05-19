import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MyButton } from "./MyButton";
import { useQuote, useQuotesWarmup, type QuoteType } from "./useQuote";

export function App() {
  const [ id, setId ] = useState(1)
  const warmupFunction = useQuotesWarmup()
  const client = useQueryClient()
  return (
    <div
      className="w-screen h-screen flex 
    flex-col items-center justify-start p-4 gap-2"
    >
      <div className="flex gap-2 items-center">
        <MyButton onClick={() => {
            warmupFunction(id - 3, id - 2);
            setId(id - 1)
          }}>Prev</MyButton>
        <div>{id}</div>
        <MyButton onClick={() => {
            warmupFunction(id + 2, id + 3);
            setId(id + 1)
        }}>Next</MyButton>
      </div>
      <QuoteDisplay id={id} />
      <MyButton onClick={() => {
        // post to server, then efresh
        client.invalidateQueries({
          queryKey: [ "quote" ]
        }) 
      }}>Reset</MyButton>
    </div>
  );
}
function QuoteDisplay({ id }: { id: number}) {
  const { data: quote, isPending } = useQuote(id)
  if (isPending) return <div>Lade noch..</div>
  return quote && <QuoteRenderer quote={quote} />  
}

function QuoteRenderer({ quote } : { quote: QuoteType }) {
  console.log("render quote")
  return (
<div className="p-4 m-2 shadow-xl bg-zinc-200 flex flex-col gap-2">
    <div>{quote.quote}</div>
    <div className="self-end text-gray-400 text-sm">
      {quote.author}
    </div>
</div>)}



function Counter() {
  const [ count, setCount ] = useState(1)
  //const [ count, setCount ] = useLocalStorage("counter1", 1)
  //const [ count, setCount ] = useQueryState("counter1", parseAsInteger.withDefault(1));
  return (
    <div className="flex gap-2 items-center">
        <MyButton onClick={() => setCount(count - 1)}>Decrement</MyButton>
      <div>{count}</div>
      <MyButton onClick={() => setCount(count + 1)}>Increment</MyButton>
    </div>
  )
}