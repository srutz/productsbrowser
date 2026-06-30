import { useEffect, useState } from "react";

export function Home() {

    return (
        <div>
            <div className="flex gap-2 flex-col">
                <Quotes/>
            </div>
        </div>
    )
}

type QuoteType = { id: number; quote: string; author: string }

function Quotes() {
    const [quotes, setQuotes] = useState<QuoteType[]>([])
    useEffect(() => {
        (async () => {
            const response = await fetch('https://dummyjson.com/quotes')
            const data = await response.json()
            await new Promise((resolve) => setTimeout(resolve, 2_000))
            setQuotes(data.quotes as QuoteType[])
        })()
    }, [])
    return <ul className="flex flex-col gap-2">
        {quotes.map((q) => <li className="p-2" 
            key={q.id}>{q.quote} - {q.author}</li>)}
    </ul>
}    


