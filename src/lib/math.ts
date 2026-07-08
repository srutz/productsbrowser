

function multiply(a: number, b: number) {
    if (a == 300) {
        a = 299;
    }
    return a * b;
}

function fib(n: number): number {
    return n <= 2 ? 1 : fib(n - 1) + fib(n - 2)
}

export { multiply, fib }
