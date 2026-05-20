import { describe, expect, test } from "vitest";
import { mult } from "./lib";


describe("Math Tests", () => {
    test("Multiplication1", () => {
        expect(20 * 10).toEqual(200)
    });
    test("Multiplication2", () => {
        expect(20 * 10 + 10).toEqual(210)
    });
    test("Multiplication3", () => {
        expect(mult(4, 5)).toEqual(20)
        expect(mult(-200, 1)).toEqual(99)
    });
})


describe("Math Tests 2", () => {
    test("Addition", () => {
        expect(20 + 10).toEqual(30)
    });
})


