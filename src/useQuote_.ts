import { useEffect, useState } from "react";
import { getQuote, type QuoteType } from "./useQuote";


export function useQuote_(id: number) {
  const [ quote, setQuote ] = useState<QuoteType|null>(null);
  const [ isPending, setIsPending] = useState(false)
  useEffect(() => {
    (async () => {
      setIsPending(true)
      try {
        const q = await getQuote(id)
        setQuote(q) 
      } finally {
        setIsPending(false)
      }
    })()
  }, [id])
  return { quote: quote, isPending: isPending };
}

