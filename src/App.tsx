import { useState } from "react";
import { MyButton } from "./MyButton";
import { useQuote, type QuoteType } from "./useQuote";

export function App() {
  const [ id, setId ] = useState(1)
  return (
    <div
      className="w-screen h-screen flex 
    flex-col items-center justify-center p-4 gap-2"
    >
      <QuoteDisplay id={id} />
      <MyButton onClick={() => setId(id+1)}>Next</MyButton>
    </div>
  );
}
function QuoteDisplay({ id }: { id: number}) {
  const { data: quote, isPending } = useQuote(id)
  if (isPending) return <div>Lade noch..</div>
  return quote && <QuoteRenderer quote={quote} />  
}

function QuoteRenderer({ quote } : { quote: QuoteType }) {
  return (
<div className="p-4 m-2 shadow-xl bg-zinc-200 flex flex-col gap-2">
    <div>{quote.quote}</div>
    <div className="self-end text-gray-400 text-sm">
      {quote.author}
    </div>
</div>)}