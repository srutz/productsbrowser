import { create } from 'zustand';


export const useAppState = create<{
    count: number,
    time: Date,
    setCount: () => void,
    updateTime: () => void,
}>((set) => { return {
    count: 1,
    time: new Date(),
    setCount: () => set((state) => ({ count: state.count + 1 })),
    updateTime: () => set({ time: new Date() }),
}});

