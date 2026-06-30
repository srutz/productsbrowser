import { useEffect, useState } from "react"


export function WindowSize() {
    const size = useWindowSize();
    return (
        <div>{size.width} X {size.height}</div>
    )
}

export function useWindowSize() {
    const [ size, setSize ] = useState({
        width: innerWidth,
        height: innerHeight,
    })
    useEffect(() => {
        const listener = () => {
            setSize({ width: innerWidth, height: innerHeight})
        }
        window.addEventListener("resize", listener)
        return () => 
            window.removeEventListener("resize", listener)
    }, [])
    return size;
}