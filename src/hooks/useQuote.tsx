import { useQuery } from "@tanstack/react-query";

export type QuoteType = { id: number, quote: string, author: string }

export async function getQuote(id: number) {
    const resp = await fetch("https://dummyjson.com/quotes/" + id)
    const json = await resp.json()
    //await delay(2_000)
    return json as QuoteType
}

export function useQuote(id: number) {
  return useQuery({
    queryKey: [ "quote", id ],
    queryFn: () => getQuote(id),
    staleTime: 5 * 60 * 1_000,
  }); 
}

