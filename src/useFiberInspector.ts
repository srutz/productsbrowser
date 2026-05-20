import { useEffect } from "react"

export function useFiberInspector(ref: React.RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return

        const domNode = ref.current
        const fiberKey = Object.keys(domNode).find(k =>
            k.startsWith("__reactFiber")
        )
        if (!fiberKey) return

        let fiber = (domNode as any)[fiberKey]
        const ancestors: string[] = []

        while (fiber) {
            const name =
                typeof fiber.type === "function"
                    ? (fiber.type.displayName ?? fiber.type.name ?? "?")
                    : typeof fiber.type === "string"
                    ? `<${fiber.type}>`
                    : null
            if (name) ancestors.push(name)
            fiber = fiber.return
        }

        console.log("Fiber-Stack:", ancestors.join(" => "))
    })
}