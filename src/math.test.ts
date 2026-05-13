import { describe, expect, test } from "vitest";
import { multiply } from "./lib/math";

describe("Mathe-tests", () => {

    test("multiplication", () => {
        expect(multiply(3, 10)).toBe(30)
    })

    test("divide", () => {
        expect(1E16 + 1 === 1E16).toBeTruthy();
    })
})


describe("Mathe-tests2", () => {

    test("addiere", () => {
        expect(10 + 3).toBe(13)
    })
})
