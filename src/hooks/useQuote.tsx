import { useQuery } from "@tanstack/react-query";

export type QuoteType = { id: number, quote: string, author: string }

export function useQuote(id: number) {
  return useQuery({
    queryKey: [ "quote", id ],
    queryFn: async() => {
      const resp = await fetch("https://dummyjson.com/quotes/" + id)
      const json = await resp.json() 
      return json as QuoteType
    }
  }); 
}

