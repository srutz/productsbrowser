import { useQuery, useQueryClient } from "@tanstack/react-query";

export type QuoteType = { id: number; quote: string; author: string }

export function useQuote(id: number) {
    return useQuery({
        queryKey: [ "quote", id],
        queryFn: async () => getQuote(id),
        staleTime: 60 * 60 * 1_000,
        // Always publish the newly fetched object so consumers rerender
        // even when the server returns the same values.
        structuralSharing: false,
    })
}

export async function getQuote(id: number) {
  const resp = await fetch("https://dummyjson.com/quotes/" + id)
  return await resp.json() as QuoteType
}

export function useQuotesWarmup() {
    const client = useQueryClient()
    return (from: number, to: number) => {
        for (let id = from; id <= to; id++) {
            client.ensureQueryData({
                queryFn: () => getQuote(id),
                queryKey: [ "quote", id]
            })
        }
    }
}