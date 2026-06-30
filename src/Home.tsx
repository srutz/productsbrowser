import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";

export function Home() {

    return (
        <div>
            <div className="flex gap-2 flex-col">
                <Suspense fallback={<div>Loading</div>}>
                    <Quotes/>
                </Suspense>
            </div>
        </div>
    )
}

type QuoteType = { id: number; quote: string; author: string }

export function usePrefetchQuotes(blocks: number) {
    const client = useQueryClient();
    useEffect(() => {
        for (let i = 0; i < blocks; i++) {
            client.ensureQueryData({
                queryKey: [ "quotes", i * 30 ],
                queryFn: () => getQuotes(i * 30)
            });
        }
    }, [ blocks, client ])
}

function Quotes() {
    const [ skip, setSkip] = useState(0);
    const { data: quotes, refetch } = useQuotes({ skip })
    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2">
                <button className="mybutton self-center" onClick={() => refetch()}>Reload</button>
                <button className="mybutton self-center" onClick={() => setSkip(skip - 30)}>Prev 30</button>
                <button className="mybutton self-center" onClick={() => setSkip(skip + 30)}>Next 30</button>
            </div>
            <ul className="flex flex-col gap-2">
            {quotes.map((q) => <QuoteView key={q.id} quote={q}/> )}
            </ul>
        </div>
    )
}

function QuoteView({quote } : { quote: QuoteType}) {
    return (
    <li className="shadow-xl rounded-lg p-4 bg-zinc-100
            border border-bg-gray-200 flex flex-col gap-2">
        <div>{quote.quote}</div>        
        <div className="text-sm self-end">{quote.author}</div>        
    </li>)
}

function useQuotes({ skip = 0} : { skip?: number}) {
    return useSuspenseQuery({
        queryKey: ["quotes", skip],
        gcTime: 60 * 60 * 1_000,
        staleTime: 60 * 60 * 1_000,
        queryFn: async ({ signal }) => {
            getQuotes(skip, signal)
        }
    })
}

export async function getQuotes(skip: number, signal?: AbortSignal) {
    const r = await fetch("https://dummyjson.com/quotes?" + "skip=" + skip, { signal })
    const data = await r.json()
    return data.quotes as QuoteType[]

}

function useQuotes_() {
    const [quotes, setQuotes] = useState<QuoteType[]>([])
    useEffect(() => {
        (async () => {
            const response = await fetch('https://dummyjson.com/quotes')
            const data = await response.json()
            await new Promise((resolve) => setTimeout(resolve, 2_000))
            setQuotes(data.quotes as QuoteType[])
        })()
    }, [])
    return { data: quotes }
}


