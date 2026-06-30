import { useState } from "react"

export const Counter = () => {
    const [count, setCount] = useState(0)
    const derName = () => setCount(count + 1)
    return (
        <div>
            <button onClick={derName}>
                Count : {count}
            </button>
        </div>
    )
}