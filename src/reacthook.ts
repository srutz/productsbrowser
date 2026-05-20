interface ReactDevToolsHook {
    onCommitFiberRoot?: (rendererID: number, root: { current: unknown }, priority?: number, didError?: boolean) => void
    onCommitFiberUnmount?: (rendererID: number, fiber: unknown) => void
}

interface GlobalWindow {
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: ReactDevToolsHook
    __renderTree?: () => void
}

declare const myHook: ReactDevToolsHook
declare const trackedRoots: Set<unknown>
declare const fiberMeta: Map<unknown, unknown>
declare function indexTree(fiber: unknown): void

const existing = (window as GlobalWindow).__REACT_DEVTOOLS_GLOBAL_HOOK__

if (!existing) {
    Object.defineProperty(window, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
        value: myHook,
        configurable: true,
    })
} else {
    const origCommit  = existing.onCommitFiberRoot?.bind(existing)
    const origUnmount = existing.onCommitFiberUnmount?.bind(existing)

    existing.onCommitFiberRoot = function (rendererID: number, root: { current: unknown }, priority?: number, didError?: boolean) {
        origCommit?.(rendererID, root, priority, didError)
        trackedRoots.add(root)
        indexTree(root.current)
        const globalWin = window as GlobalWindow
        globalWin.__renderTree?.()
    }

    existing.onCommitFiberUnmount = function (rendererID: number, fiber: unknown) {
        origUnmount?.(rendererID, fiber)
        fiberMeta.delete(fiber)
    }
}