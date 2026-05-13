import { bench } from "vitest";
import { fib } from "./math";

 bench("perf", () => {
    console.time()
    fib(40)
    console.timeEnd()
 })
