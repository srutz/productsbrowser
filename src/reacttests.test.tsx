import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, test } from "vitest";

function Banner() {
    const [ text, setText ] = useState("Hello")  
    return (
    <>
        <button data-testid="tid" onClick={() => {
            setText("Cologne")
        }}>
            Click me        
        </button>
        <div>{text}</div>
    </>)
}

describe("react-tests", () => {
    test("dummy", () => {
        expect(1).toEqual(1)
    })
    test("test no1", async () => {
        const user = userEvent.setup()

        render(<Banner/>)
        const button = screen.getByTestId("tid")
        await user.click(button)
        expect(await screen.findByText("Cologne"))
            .toBeInTheDocument()
    })
})