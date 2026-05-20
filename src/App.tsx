import { useNavigate, useParams } from "react-router";
import { MyButton } from "./MyButton";
import { useQuote, useQuotesWarmup, type QuoteType } from "./useQuote";


export function QuoteDisplay() {
  const { id: idStr } = useParams()
  const id = Number.parseInt(idStr || "1")
  const { data: quote, isPending } = useQuote(id)
  const warmup = useQuotesWarmup();
  const navigate = useNavigate();
  return (
  <div className="flex flex-col gap-4">
    <div className="flex gap-2 self-center">
      <MyButton onClick={() => {
        warmup(id - 2, id - 2)
        navigate("/quotes/" + (Math.max(1, id - 1)))
      }}>Prev</MyButton>
      <MyButton onClick={() => {
        warmup(id + 2, id + 2)
        navigate("/quotes/" + (id + 1))}
      }>Next</MyButton>
    </div>
    {isPending || !quote 
      ? (<div>Lade noch..</div>)
      : (<QuoteRenderer quote={quote} />)
    }
  </div>)
}

function QuoteRenderer({ quote } : { quote: QuoteType }) {
  return (
<div className="p-4 m-2 shadow-xl bg-zinc-200 flex flex-col gap-2">
    <div>{quote.quote}</div>
    <div className="self-end text-gray-400 text-sm">
      {quote.author}
    </div>
</div>)}



