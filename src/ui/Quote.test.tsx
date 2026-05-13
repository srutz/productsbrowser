import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react"
import { Quote } from "@/routes/quote.$quoteId";
import { getQuote, useQuote } from "@/hooks/useQuote";

describe("Test Quotes", () => { 
    test("test panel", () => {
        render(<div>abc</div>)
        expect(screen.getByText("abc")).toBeInTheDocument()
    })
    test("quotepanel", async () => {
        console.time();
        const quote = { 
            id: 16,
            quote: "Morgenstund hat Gold im Mund",
            author: "Frühaufsteher"
        };
        //(window as unknown as unknown) = undefined
        render(
            <div>
                <Quote quote={quote} />
                <button role="button">Click me {window.innerWidth}</button>
            </div>
        )
        expect(screen.getByText("Frühaufsteher")).toBeInTheDocument()
        console.log("window", window.innerWidth);
        console.timeEnd();
    })
})