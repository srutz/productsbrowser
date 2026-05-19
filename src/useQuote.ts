import { useQuery } from "@tanstack/react-query";

export type QuoteType = { id: number; quote: string; author: string }

export function useQuote(id: number) {
    return useQuery({
        queryKey: [ "quote", id],
        queryFn: async () => getQuote(id)
    })
}

export async function getQuote(id: number) {
  const resp = await fetch("https://dummyjson.com/quotes/" + id)
  return await resp.json() as QuoteType
}
