import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { MyButton } from "./MyButton";
import { useQuote, useQuotesWarmup, type QuoteType } from "./useQuote";

export function App() {
  const [ id, setId ] = useState(1)
  useQuotesWarmup(1, 20)
  const client = useQueryClient()
  return (
    <div
      className="w-screen h-screen flex 
    flex-col items-center justify-start p-4 gap-2"
    >
      <div className="flex gap-2">
        <MyButton onClick={() => setId(id-1)}>Prev</MyButton>
        <MyButton onClick={() => setId(id+1)}>Next</MyButton>
      </div>
      <QuoteDisplay id={id} />
      <QuoteDisplay id={3} />
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
    <div className="self-end text-gray-400 text-sm">
      Gerendert am: {new Date().toLocaleTimeString()}
    </div>
    <div>{quote.quote}</div>
    <div className="self-end text-gray-400 text-sm">
      {quote.author}
    </div>
</div>)}