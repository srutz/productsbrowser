import { bench, describe } from "vitest";

function fib(n: number): number {
    return n <= 2 ? 1 : fib(n - 1) + fib(n - 2)
}

function fibFast(n: number): number {
    const sqrt5 = Math.sqrt(5)
    const phi = (1 + sqrt5) / 2
    const psi = (1 - sqrt5) / 2
    return Math.round((phi ** n - psi ** n) / sqrt5)
}

describe("suite1", () => {
    bench("Perf1", () => {
        fib(35)
    })
    bench("Perf2", () => {
        fibFast(35)
    })
})
